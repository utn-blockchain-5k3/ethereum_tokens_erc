// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ERC20Edu
 * @dev Token ERC-20 educativo simplificado para OpenZeppelin 5
 * Funcionalidades:
 * - Token ERC-20 estándar
 * - Minting controlado por owner
 * - Burning permitido para holders
 * - Funciones educativas para explorar el estándar
 */
contract ERC20Edu is ERC20, Ownable {
    // Total supply inicial
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 millón de tokens
    
    // Máximo supply que se puede mintear adicional
    uint256 public constant MAX_ADDITIONAL_SUPPLY = 500000 * 10**18; // 500k adicionales
    
    // Tracking de supply adicional minteado
    uint256 public additionalSupplyMinted;
    
    // Eventos educativos
    event TokensMinted(address indexed to, uint256 amount, string reason);
    event TokensBurned(address indexed from, uint256 amount, string reason);
    event EducationalInfo(string info, uint256 value);
    
    /**
     * @dev Constructor que crea el supply inicial
     * @param name Nombre del token
     * @param symbol Símbolo del token  
     * @param initialSupply Supply inicial (en tokens, no wei)
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        uint256 supply = initialSupply * 10**decimals();
        _mint(msg.sender, supply);
        
        emit EducationalInfo("Token created with initial supply", supply);
    }
    
    // ========================================
    // FUNCIONES DE MINTING Y BURNING
    // ========================================
    
    /**
     * @dev Mintea tokens adicionales (solo owner)
     * @param to Dirección que recibirá los tokens
     * @param amount Cantidad de tokens a mintear
     * @param reason Razón del minting
     */
    function mint(address to, uint256 amount, string calldata reason) external onlyOwner {
        require(additionalSupplyMinted + amount <= MAX_ADDITIONAL_SUPPLY, "Exceeds max additional supply");
        
        additionalSupplyMinted += amount;
        _mint(to, amount);
        
        emit TokensMinted(to, amount, reason);
        emit EducationalInfo("Additional tokens minted", amount);
    }
    
    /**
     * @dev Quema tokens del caller
     * @param amount Cantidad de tokens a quemar
     * @param reason Razón del burning
     */
    function burn(uint256 amount, string calldata reason) external {
        _burn(msg.sender, amount);
        
        emit TokensBurned(msg.sender, amount, reason);
        emit EducationalInfo("Tokens burned", amount);
    }
    
    /**
     * @dev Quema tokens de una dirección específica (requiere allowance)
     * @param from Dirección de la cual quemar tokens
     * @param amount Cantidad de tokens a quemar
     * @param reason Razón del burning
     */
    function burnFrom(address from, uint256 amount, string calldata reason) external {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
        
        emit TokensBurned(from, amount, reason);
        emit EducationalInfo("Tokens burned from address", amount);
    }
    
    // ========================================
    // FUNCIONES EDUCATIVAS
    // ========================================
    
    /**
     * @dev Obtiene el total supply actual
     * @return Total supply en wei
     */
    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }
    
    /**
     * @dev Obtiene el balance de una dirección
     * @param account Dirección a consultar
     * @return Balance en wei
     */
    function getBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }
    
    /**
     * @dev Obtiene información completa del token
     * @return name_ Nombre del token
     * @return symbol_ Símbolo del token
     * @return decimals_ Decimales del token
     * @return totalSupply_ Total supply actual
     */
    function getTokenInfo() external view returns (
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalSupply_
    ) {
        return (name(), symbol(), decimals(), totalSupply());
    }
    
    /**
     * @dev Obtiene información de allowance entre dos direcciones
     * @param owner_ Dueño de los tokens
     * @param spender_ Gastador autorizado
     * @return allowance_ Cantidad autorizada
     */
    function getAllowanceInfo(address owner_, address spender_) external view returns (uint256 allowance_) {
        return allowance(owner_, spender_);
    }
    
    /**
     * @dev Simula transferencia para ver si es válida (sin ejecutar)
     * @param to Dirección destino
     * @param amount Cantidad a transferir
     * @return success Si la transferencia sería exitosa
     * @return reason Razón del resultado
     */
    function simulateTransfer(address to, uint256 amount) external view returns (bool success, string memory reason) {
        if (to == address(0)) {
            return (false, "Transfer to zero address");
        }
        if (balanceOf(msg.sender) < amount) {
            return (false, "Insufficient balance");
        }
        return (true, "Transfer would succeed");
    }
    
    /**
     * @dev Obtiene estadísticas del contrato
     * @return initialSupply_ Supply inicial
     * @return additionalMinted_ Supply adicional minteado
     * @return currentSupply_ Supply actual
     * @return maxPossibleSupply_ Máximo supply posible
     */
    function getContractStats() external view returns (
        uint256 initialSupply_,
        uint256 additionalMinted_,
        uint256 currentSupply_,
        uint256 maxPossibleSupply_
    ) {
        return (
            INITIAL_SUPPLY,
            additionalSupplyMinted,
            totalSupply(),
            INITIAL_SUPPLY + MAX_ADDITIONAL_SUPPLY
        );
    }
    
    /**
     * @dev Convierte cantidad de tokens a wei
     * @param tokenAmount Cantidad en tokens
     * @return weiAmount Cantidad en wei
     */
    function tokensToWei(uint256 tokenAmount) external view returns (uint256 weiAmount) {
        return tokenAmount * 10**decimals();
    }
    
    /**
     * @dev Convierte cantidad de wei a tokens
     * @param weiAmount Cantidad en wei  
     * @return tokenAmount Cantidad en tokens
     */
    function weiToTokens(uint256 weiAmount) external view returns (uint256 tokenAmount) {
        return weiAmount / 10**decimals();
    }
}