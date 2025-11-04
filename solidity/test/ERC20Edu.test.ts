import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20Edu", function () {
  let erc20Edu: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const ERC20EduFactory = await ethers.getContractFactory("ERC20Edu");
    erc20Edu = await ERC20EduFactory.deploy(
      "EduToken",
      "EDU", 
      ethers.parseUnits("1000000", 18)
    );
    await erc20Edu.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await erc20Edu.name()).to.equal("EduToken");
      expect(await erc20Edu.symbol()).to.equal("EDU");
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await erc20Edu.balanceOf(owner.address);
      expect(await erc20Edu.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct decimals", async function () {
      expect(await erc20Edu.decimals()).to.equal(18);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseUnits("50", 18);
      await erc20Edu.transfer(addr1.address, transferAmount);
      const addr1Balance = await erc20Edu.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await erc20Edu.balanceOf(owner.address);
      await expect(
        erc20Edu.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(erc20Edu, "ERC20InsufficientBalance");
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await erc20Edu.balanceOf(owner.address);
      const transferAmount = ethers.parseUnits("100", 18);
      
      await erc20Edu.transfer(addr1.address, transferAmount);
      await erc20Edu.transfer(addr2.address, transferAmount);

      const finalOwnerBalance = await erc20Edu.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - (transferAmount * 2n));
      
      const addr1Balance = await erc20Edu.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(transferAmount);
      
      const addr2Balance = await erc20Edu.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(transferAmount);
    });
  });

  describe("Allowances", function () {
    it("Should approve tokens for delegation", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      await erc20Edu.approve(addr1.address, approveAmount);
      
      expect(await erc20Edu.allowance(owner.address, addr1.address)).to.equal(approveAmount);
    });

    it("Should transfer tokens using transferFrom", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("50", 18);
      
      await erc20Edu.approve(addr1.address, approveAmount);
      await erc20Edu.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);
      
      expect(await erc20Edu.balanceOf(addr2.address)).to.equal(transferAmount);
    });
  });

  describe("Educational Functions", function () {
    it("Should return correct total supply", async function () {
      const totalSupply = await erc20Edu.getTotalSupply();
      const expectedSupply = await erc20Edu.totalSupply();
      expect(totalSupply).to.equal(expectedSupply);
    });

    it("Should return correct balance for address", async function () {
      const balance = await erc20Edu.getBalance(owner.address);
      expect(balance).to.equal(await erc20Edu.balanceOf(owner.address));
    });

    it("Should return correct token info", async function () {
      const tokenInfo = await erc20Edu.getTokenInfo();
      expect(tokenInfo[0]).to.equal("EduToken");  // name
      expect(tokenInfo[1]).to.equal("EDU");       // symbol
      expect(tokenInfo[2]).to.equal(18);          // decimals
      expect(tokenInfo[3]).to.equal(await erc20Edu.totalSupply()); // totalSupply
    });
  });
});