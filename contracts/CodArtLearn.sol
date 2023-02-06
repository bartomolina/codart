// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

//  _                _                        _ _                   _   _
// | |              | |                      | (_)                 | | | |
// | |__   __ _ _ __| |_ ___  _ __ ___   ___ | |_ _ __   __ _   ___| |_| |__
// | '_ \ / _` | '__| __/ _ \| '_ ` _ \ / _ \| | | '_ \ / _` | / _ \ __| '_ \
// | |_) | (_| | |  | || (_) | | | | | | (_) | | | | | | (_| ||  __/ |_| | | |
// |_.__/ \__,_|_|   \__\___/|_| |_| |_|\___/|_|_|_| |_|\__,_(_)___|\__|_| |_|
//

contract CodArtLearn is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC721URIStorageUpgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    uint256 maxSupply;
    uint256 price;
    string _library;
    string script;

    CountersUpgradeable.Counter private _tokenIdCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
      address _owner,
      string calldata _name,
      string calldata _symbol,
      uint256 _maxSupply,
      uint256 _price,
      string calldata _lib,
      string calldata _script
    ) initializer public {
        maxSupply = _maxSupply;
        price = _price;
        _library = _lib;
        script = _script;
        __ERC721_init(_name, _symbol);
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __Ownable_init();
        transferOwnership(_owner);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        require (totalSupply() < maxSupply);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
