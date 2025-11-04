# ERC-20 Tokens: Ethereum vs Hyperledger Fabric 🎓

Proyecto educativo para implementar tokens ERC-20 en **Ethereum** (Solidity) y **Hyperledger Fabric** (JavaScript), comparando ambas plataformas blockchain.


### 🎯 **Objetivo Principal**
Crear y comparar implementaciones de **tokens ERC-20** en dos plataformas blockchain diferentes:

1. **Ethereum** usando Solidity y OpenZeppelin
   - Plataforma blockchain pública descentralizada
   - Lenguaje Solidity con framework Hardhat
   - Integración con librerías estándar de OpenZeppelin
   - Testing automatizado con JavaScript/TypeScript

2. **Hyperledger Fabric** usando Chaincode en JavaScript
   - Plataforma blockchain empresarial con permisos
   - Chaincode en JavaScript usando Node.js
   - Arquitectura modular con peers y orderers
   - Simulación de transacciones con Fabric SDK

## 🧠 Introducción Teórica Detallada

### 📜 ¿Qué son los ERCs (Ethereum Request for Comments)?

Los **ERCs** son documentos técnicos que describen **estándares y especificaciones** para la blockchain de Ethereum. Son similares a los RFC (Request for Comments) del mundo de Internet, pero específicamente diseñados para el ecosistema blockchain.

#### 🎯 **¿Para qué sirven los ERCs?**

Los ERCs resuelven un problema fundamental: **la interoperabilidad**. Sin estándares comunes, cada desarrollador podría crear tokens con interfaces diferentes, haciendo imposible que las aplicaciones, wallets y exchanges trabajen juntos de manera eficiente.

#### 📋 **Proceso de Creación de un ERC**
1. **Propuesta**: Un desarrollador identifica la necesidad de un nuevo estándar
2. **Draft**: Se escribe una especificación técnica detallada
3. **Revisión Comunitaria**: La comunidad Ethereum revisa y comenta
4. **Implementación**: Se crean implementaciones de referencia
5. **Finalización**: El ERC se convierte en estándar oficial

#### 🏷️ **Principales Estándares ERC en Detalle**

##### **ERC-20: El Estándar de Tokens Fungibles**
- **¿Qué es?**: Define cómo crear tokens intercambiables (como monedas)
- **Funciones obligatorias**:
  - `totalSupply()`: Cantidad total de tokens
  - `balanceOf(address)`: Balance de una dirección
  - `transfer(to, amount)`: Transferir tokens
  - `approve(spender, amount)`: Aprobar gasto por terceros
  - `transferFrom(from, to, amount)`: Transferir tokens aprobados
  - `allowance(owner, spender)`: Ver cantidad aprobada para gastar

- **Eventos obligatorios**:
  - `Transfer(from, to, value)`: Se emite en cada transferencia
  - `Approval(owner, spender, value)`: Se emite al aprobar gastos

- **Ejemplos reales exitosos**:
  - **USDC**: Stablecoin respaldado por dólares ($150B+ market cap)
  - **DAI**: Stablecoin descentralizado generado por MakerDAO
  - **UNI**: Token de governance de Uniswap
  - **LINK**: Token de Chainlink para oracles

##### **ERC-721: Tokens No Fungibles (NFTs)**
- **Diferencia clave**: Cada token es único e indivisible
- **Casos de uso**: Arte digital, coleccionables, certificados, identidad
- **Función principal**: `ownerOf(tokenId)` retorna el propietario único

##### **ERC-1155: Multi-Token Standard**
- **Innovación**: Un solo contrato puede manejar múltiples tipos de tokens
- **Eficiencia**: Reduce costos de gas significativamente
- **Uso principal**: Videojuegos (items únicos + monedas del juego)

##### **ERC-721A: NFTs Optimizados**
- **Propósito**: Versión optimizada de ERC-721 para minting masivo
- **Innovación**: Reduce costos de gas hasta 80% en mints múltiples
- **Casos de uso**: Proyectos NFT con grandes colecciones (10k+)
- **Ventaja**: O(1) minting cost independiente de la cantidad
- **Ejemplos reales**: Azuki, CryptoDickbutts

##### **ERC-4626: Tokenized Vaults**
- **Propósito**: Estándar para vaults de tokens tokenizados
- **Casos de uso**: Yield farming, lending protocols, estrategias DeFi
- **Funciones clave**: `deposit()`, `withdraw()`, `convertToShares()`
- **Ejemplos reales**: Yearn Finance, Compound, Aave

##### **ERC-2981: NFT Royalty Standard**
- **Propósito**: Estándar para royalties en NFTs
- **Funcionalidad**: Royalties automáticos en ventas secundarias
- **Casos de uso**: Artistas digitales, creators de contenido
- **Función principal**: `royaltyInfo(tokenId, salePrice)`
- **Adopción**: OpenSea, LooksRare, otros marketplaces

##### **ERC-3525: Semi-Fungible Tokens (SFTs)**
- **Propósito**: Tokens que combinan características fungibles y no fungibles
- **Casos de uso**: Certificados de depósito, bonos, vouchers
- **Innovación**: Cada token tiene un ID único pero puede tener valor divisible
- **Ejemplos**: Solv Protocol, certificados financieros

##### **ERC-6551: Token Bound Accounts (TBA)**
- **Propósito**: Convierte cualquier NFT en una cuenta Ethereum
- **Innovación**: Cada NFT puede poseer otros tokens y NFTs
- **Casos de uso**: Gaming (inventarios), colecciones anidadas
- **Funcionalidad**: `createAccount()`, permite transacciones desde el NFT

### 🔧 Estándares Emergentes y Experimentales

#### **ERC-5114: Soulbound Tokens (SBTs)**
- **Concepto**: Tokens no transferibles vinculados a una identidad
- **Propósito**: Credenciales, certificaciones, reputación
- **Características**: 
  - No se pueden transferir una vez emitidos
  - Representan logros o afiliaciones permanentes
- **Casos de uso**: Diplomas universitarios, certificaciones profesionales, historial crediticio

#### **ERC-4337: Account Abstraction**
- **Objetivo**: Wallets programables sin cambios al protocolo
- **Beneficios**: 
  - Transacciones sin gas para usuarios
  - Recuperación de cuentas social
  - Transacciones por lotes
- **Estado**: En desarrollo activo, adoptado por Polygon

#### **ERC-2535: Diamond Standard**
- **Propósito**: Contratos inteligentes modulares y actualizables
- **Ventajas**:
  - Supera el límite de 24KB de Ethereum
  - Upgrades granulares
  - Reutilización de código
- **Casos de uso**: Protocolos DeFi complejos, DAOs avanzadas

### 📊 Estadísticas de Adopción de ERCs (2024)

| ERC | Tokens Activos | TVL/Market Cap | Casos de Uso Principales |
|-----|---------------|----------------|-------------------------|
| **ERC-20** | 500,000+ | $2T+ | DeFi, stablecoins, governance |
| **ERC-721** | 80,000+ | $15B+ | Arte digital, gaming, coleccionables |
| **ERC-1155** | 15,000+ | $5B+ | Gaming, metaversos, utilidades |
| **ERC-4626** | 500+ | $50B+ | Yield strategies, lending |
| **ERC-721A** | 2,000+ | $3B+ | Colecciones NFT grandes |

### 🎯 ¿Por qué tantos estándares ERC?

#### **Evolución Natural del Ecosistema**
- **Necesidades específicas**: Cada caso de uso requiere optimizaciones específicas
- **Eficiencia de gas**: Nuevos estándares reducen costos operativos
- **Funcionalidades avanzadas**: Capacidades que ERC-20/721 no cubren
- **Interoperabilidad**: Estándares que conectan diferentes protocolos

#### **Casos de Uso Específicos por ERC**

**Para DeFi (Finanzas Descentralizadas)**:
- **ERC-20**: Tokens base (USDC, DAI, WETH)
- **ERC-4626**: Vaults de yield farming
- **ERC-2535**: Protocolos complejos como Aave

**Para Gaming y Metaversos**:
- **ERC-721**: Personajes únicos, tierras virtuales
- **ERC-1155**: Items del juego, recursos
- **ERC-6551**: Inventarios de personajes

**Para Arte y Coleccionables**:
- **ERC-721**: Arte digital individual
- **ERC-721A**: Colecciones grandes (PFP projects)
- **ERC-2981**: Royalties para artistas

**Para Identidad y Credenciales**:
- **ERC-5114**: Diplomas, certificaciones
- **ERC-725**: Identidad auto-soberana
- **ERC-6551**: Identidades complejas con posesiones

### 🛡️ OpenZeppelin: La Biblioteca de Seguridad de Ethereum

#### 🔒 **¿Por qué necesitamos OpenZeppelin?**

Escribir smart contracts seguros es **extremadamente difícil**. Los errores pueden costar millones de dólares (como el hack de The DAO en 2016 que resultó en pérdidas de $60M). OpenZeppelin resuelve esto proporcionando implementaciones **probadas en batalla** y **auditadas por expertos**.

#### ✅ **Beneficios de OpenZeppelin**

##### **🔐 Seguridad Probada**
- **Auditorías profesionales**: Cada release es auditado por expertos en ciberseguridad blockchain
- **Battle-tested**: Usado por proyectos que manejan billones de dólares (Aave, Compound, Uniswap)
- **Actualizaciones rápidas**: Parches de seguridad en horas cuando se descubren vulnerabilidades
- **Track record perfecto**: Sin vulnerabilidades críticas en 5+ años de uso masivo
- **Bug bounty programs**: Programa de recompensas de hasta $50,000 por encontrar vulnerabilidades

##### **📋 Estandarización Completa**
- **Implementaciones exactas**: Siguen las especificaciones ERC al pie de la letra
- **Compatibilidad universal**: Funcionan con todos los wallets, exchanges y dApps
- **Documentación extensa**: Cada función documentada con ejemplos y mejores prácticas
- **Testing exhaustivo**: +95% cobertura de tests con casos edge incluidos
- **Compliance**: Cumple con estándares de la industria y regulaciones

##### **🧩 Modularidad y Reutilización**
- **Componentes modulares**: Importa solo lo que necesitas para optimizar gas
- **Extensibilidad fácil**: Herencia simple para agregar funcionalidad personalizada
- **Patrones probados**: Implementa design patterns de seguridad reconocidos
- **Interoperabilidad**: Diseñado para trabajar con otros protocolos DeFi
- **Actualizaciones**: Sistema de upgrades seguro para contratos proxy

#### 🎯 **Casos de Uso Reales con OpenZeppelin**

##### **💰 DeFi Protocols (>$100B Total Value Locked)**
- **Aave**: Lending protocol con $5B+ TVL usando OpenZeppelin AccessControl
- **Compound**: Automated market maker usando OpenZeppelin ERC20 y Governance
- **1inch**: DEX aggregator con OpenZeppelin security patterns
- **Curve**: Stablecoin exchange con OpenZeppelin proxy patterns

##### **🎮 Gaming & NFTs**
- **Axie Infinity**: NFT gaming con OpenZeppelin ERC721 y marketplace
- **The Sandbox**: Virtual world usando OpenZeppelin ERC1155 para assets
- **Decentraland**: Metaverse platform con OpenZeppelin governance tokens

##### **�️ Enterprise & Institutions**
- **JPMorgan**: JPM Coin usa patrones similares a OpenZeppelin para compliance
- **Visa**: Crypto settlements usando OpenZeppelin security standards
- **Central Banks**: CBDCs en desarrollo usan OpenZeppelin como referencia


##### ✅ **Ventajas de OpenZeppelin**
- **Seguridad Probada**: Contratos auditados por expertos en ciberseguridad
- **Estandarización**: Implementaciones que siguen exactamente las especificaciones ERC
- **Modularidad**: Código reutilizable que sigue principios DRY (Don't Repeat Yourself)
- **Actualizaciones**: Compatibilidad con las últimas versiones de Solidity
- **Comunidad**: Respaldado por miles de desarrolladores y proyectos

## 📋 Estructura del Proyecto

```
ethereum_tokens_erc/
├── solidity/              # Implementación Ethereum
│   ├── contracts/         # Contratos Solidity
│   ├── test/             # Tests automatizados
│   └── scripts/          # Scripts de deployment
├── fabric/               # Implementación Hyperledger Fabric
│   ├── chaincode/        # Chaincode JavaScript
│   └── application/      # Cliente de aplicación
└── README.md            # Esta documentación
```

---

## 🔷 PARTE 1: ETHEREUM (SOLIDITY)

### ¿Qué es ERC-20?

ERC-20 es el estándar más usado para tokens en Ethereum. Define funciones básicas que todo token debe tener:

- `totalSupply()` - Cantidad total de tokens
- `balanceOf(address)` - Balance de una dirección
- `transfer(to, amount)` - Transferir tokens
- `approve(spender, amount)` - Aprobar gasto
- `transferFrom(from, to, amount)` - Transferir con aprobación

### Tecnologías Usadas

- **Solidity ^0.8.20** - Lenguaje de smart contracts
- **Hardhat** - Framework de desarrollo
- **OpenZeppelin** - Librerías de seguridad
- **TypeScript** - Tests automatizados


### Instalación Solidity

```bash
# 1. Clonar el repositorio
git clone https://github.com/utn-blockchain-5k3/ethereum_tokens_erc
cd ethereum_tokens_erc

# 2. Navegar a la carpeta Solidity e instalar dependencias
cd solidity

```


### Cómo Probar Solidity

#### 1. Instalar dependencias
```bash
cd solidity
npm install
```

#### 2. Compilar contratos
```bash
npx hardhat compile
```

#### 3. Ejecutar tests
```bash
npx hardhat test
```

#### 4. Deploy en red local
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

### Contrato Principal: ERC20Edu.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Edu is ERC20, Ownable {
    constructor() ERC20("EduToken", "EDU") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    
    // Funciones educativas adicionales
    function getTokenInfo() public view returns (string memory, string memory, uint8, uint256) {
        return (name(), symbol(), decimals(), totalSupply());
    }
}
```

---

## 🔶 PARTE 2: HYPERLEDGER FABRIC

### ¿Qué es Hyperledger Fabric?

Hyperledger Fabric es una blockchain **empresarial** con permisos, diseñada para organizaciones que necesitan:

- **Privacidad** - Solo participantes autorizados
- **Control** - Governance empresarial  
- **Performance** - Mayor velocidad que blockchains públicas
- **Compliance** - Cumplimiento regulatorio

### Tecnologías Usadas

- **JavaScript/Node.js** - Lenguaje del chaincode
- **Fabric Contract API** - SDK para contratos
- **Docker** - Contenedores para la red
- **CouchDB** - Base de datos del ledger


### Prerrequisitos

```bash
# Node.js (versión 18 o superior)
node --version  # debe ser >= 18.0.0

# NPM o Yarn
npm --version
```


### Instalación Fabric

```bash
# Docker y Docker Compose
docker --version
docker-compose --version

# Curl para descargar binarios
curl --version

# Descargar Fabric binaries y Docker images
curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh
chmod +x install-fabric.sh
./install-fabric.sh docker binary
```

### Cómo Probar Fabric

#### 1. Instalar dependencias
```bash
cd fabric/chaincode
npm install
```

#### 2. Verificar sintaxis del chaincode
```bash
node -c index.js
node -c lib/tokenERC20.js
```

#### 3. Empaquetar chaincode (requiere red Fabric)
```bash
peer lifecycle chaincode package token.tar.gz --path . --lang node --label token_1.0
```

### Chaincode Principal: tokenERC20.js

```javascript
const { Contract } = require('fabric-contract-api');

class TokenERC20 extends Contract {
    
    async InitLedger(ctx) {
        const tokenInfo = {
            name: 'FabricToken',
            symbol: 'FTK',
            totalSupply: '1000000000000000000000000' // 1M tokens
        };
        
        await ctx.stub.putState('tokenInfo', Buffer.from(JSON.stringify(tokenInfo)));
        await ctx.stub.putState(ctx.clientIdentity.getID(), Buffer.from(tokenInfo.totalSupply));
        
        return JSON.stringify(tokenInfo);
    }
    
    async Transfer(ctx, to, value) {
        const from = ctx.clientIdentity.getID();
        
        // Obtener balances
        const fromBalance = await this.BalanceOf(ctx, from);
        const toBalance = await this.BalanceOf(ctx, to);
        
        // Validar transferencia
        if (parseInt(fromBalance) < parseInt(value)) {
            throw new Error('Insufficient balance');
        }
        
        // Actualizar balances
        await ctx.stub.putState(from, Buffer.from((parseInt(fromBalance) - parseInt(value)).toString()));
        await ctx.stub.putState(to, Buffer.from((parseInt(toBalance) + parseInt(value)).toString()));
        
        return true;
    }
    
    async BalanceOf(ctx, account) {
        const balanceBytes = await ctx.stub.getState(account);
        return balanceBytes && balanceBytes.length > 0 ? balanceBytes.toString() : '0';
    }
}

module.exports = TokenERC20;
```

---

## 🏆 DESAFÍO ÚNICO

### Objetivo: Implementar Token ERC-20 Completo

**Tu misión**: Crear un token ERC-20 que funcione tanto en Ethereum como en Hyperledger Fabric, implementando todas las funciones estándar y probando que funcionen correctamente.

### Requerimientos

✅ **Funciones ERC-20 obligatorias**:
- `totalSupply()` / `TotalSupply()`
- `balanceOf()` / `BalanceOf()`  
- `transfer()` / `Transfer()`
- `approve()` / `Approve()`
- `transferFrom()` / `TransferFrom()`
- `allowance()` / `Allowance()`

✅ **Testing completo**:
- Tests unitarios en ambas plataformas
- Verificar todos los casos de uso
- Manejo de errores (balances insuficientes, etc.)

✅ **Deploy funcional**:
- Ethereum: Deploy en red local/testnet
- Fabric: Chaincode instalado y funcionando

---

## 📝 PASO A PASO PARA RESOLVER EL DESAFÍO

### Fase 1: Setup (30 minutos)

#### 1.1 Preparar entorno Ethereum
```bash
cd solidity
npm install
npx hardhat compile
npx hardhat test
```

#### 1.2 Preparar entorno Fabric
```bash
cd fabric/chaincode
npm install
node -c index.js
```

### Fase 2: Analizar código existente (45 minutos)

#### 2.1 Estudiar contrato Solidity
- Abrir `solidity/contracts/ERC20Edu.sol`
- Entender cada función implementada
- Revisar tests en `solidity/test/ERC20Edu.test.ts`

#### 2.2 Estudiar chaincode Fabric
- Abrir `fabric/chaincode/lib/tokenERC20.js`
- Comparar funciones con ERC-20 estándar
- Entender diferencias de implementación

### Fase 3: Implementar funciones faltantes (2 horas)

#### 3.1 En Solidity (si faltan)
```solidity
// Ejemplo: función approve si no existe
function approve(address spender, uint256 amount) public returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
}
```

#### 3.2 En Fabric (implementar todas las ERC-20)
```javascript
// Ejemplo: función Approve
async Approve(ctx, spender, value) {
    const owner = ctx.clientIdentity.getID();
    const allowanceKey = ctx.stub.createCompositeKey('allowance', [owner, spender]);
    await ctx.stub.putState(allowanceKey, Buffer.from(value));
    return true;
}
```

### Fase 4: Testing (1 hora)

#### 4.1 Probar Ethereum
```bash
cd solidity
npx hardhat test --verbose
```

#### 4.2 Probar Fabric
```bash
cd fabric/chaincode
# Verificar sintaxis
node -c lib/tokenERC20.js
```

### Fase 5: Deploy y documentación (1 hora)

#### 5.1 Deploy Ethereum
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

#### 5.2 Documentar diferencias
Crear archivo `COMPARACION.md` explicando:
- Diferencias de sintaxis
- Ventajas/desventajas de cada plataforma
- Casos de uso recomendados

---

## 🎯 Criterios de Evaluación

| Aspecto | Peso | Descripción |
|---------|------|-------------|
| **Funcionalidad** | 40% | Todas las funciones ERC-20 funcionando |
| **Testing** | 25% | Tests pasando en ambas plataformas |
| **Deploy** | 20% | Contratos desplegados exitosamente |
| **Documentación** | 15% | Comparación técnica clara |

---

## 🛠️ Recursos Adicionales

### Links Útiles
- [ERC-20 Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Hardhat Tutorial](https://hardhat.org/tutorial)
- [Fabric Docs](https://hyperledger-fabric.readthedocs.io/)

### Comandos Útiles

#### Ethereum/Hardhat
```bash
npx hardhat compile          # Compilar contratos
npx hardhat test            # Ejecutar tests
npx hardhat node            # Red local
npx hardhat console         # Consola interactiva
```

#### Fabric
```bash
npm test                    # Ejecutar tests (si existen)
node -c archivo.js          # Verificar sintaxis
peer chaincode invoke      # Ejecutar función
peer chaincode query       # Consultar estado
```

