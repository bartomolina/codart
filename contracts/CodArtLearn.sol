// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

//  _                _                        _ _                   _   _
// | |              | |                      | (_)                 | | | |
// | |__   __ _ _ __| |_ ___  _ __ ___   ___ | |_ _ __   __ _   ___| |_| |__
// | '_ \ / _` | '__| __/ _ \| '_ ` _ \ / _ \| | | '_ \ / _` | / _ \ __| '_ \
// | |_) | (_| | |  | || (_) | | | | | | (_) | | | | | | (_| ||  __/ |_| | | |
// |_.__/ \__,_|_|   \__\___/|_| |_| |_|\___/|_|_|_| |_|\__,_(_)___|\__|_| |_|
//

struct CodArtLearInfo {
    string name;
    string symbol;
    string artist;
    string description;
    uint256 maxSupply;
    uint256 price;
    string _library;
    string libraryURL;
    string code;
}

struct CodArtLearnInstance {
    address _address;
    CodArtLearInfo info;
}

string constant html1 = '<html><head><script src="';
string constant html2 = '"></script><script>tokenData={hash: "';
string constant html3 = '"};';
string constant html4 = "</script></head><body><main></main></body></html>";

contract CodArtLearn is
    Initializable,
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;
    CodArtLearInfo private contractInfo;
    mapping(uint256 => bytes32) private _tokenIdToHash;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _owner,
        CodArtLearInfo calldata _contractInfo
    ) public initializer {
        contractInfo = _contractInfo;
        __ERC721_init(contractInfo.name, contractInfo.symbol);
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __Ownable_init();
        transferOwnership(_owner);
        safeMint(_owner);
    }

    function safeMint(address to) public {
        if (contractInfo.maxSupply > 0) {
            require(totalSupply() < contractInfo.maxSupply);
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _tokenIdToHash[tokenId] = keccak256(
            abi.encodePacked(to, block.timestamp, block.difficulty)
        );
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721Upgradeable, ERC721URIStorageUpgradeable) {
        super._burn(tokenId);
    }

    function tokenIdToHash(
        uint256 tokenId
    ) public view returns (string memory) {
        return bytes32ToLiteralString(_tokenIdToHash[tokenId]);
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        bytes memory metadata = abi.encodePacked(
            '{"name":"',
            contractInfo.name,
            '", "description":"',
            contractInfo.description,
            '","animation_url":"data:text/html;base64,',
            Base64.encode(
                abi.encodePacked(
                    html1,
                    contractInfo.libraryURL,
                    html2,
                    bytes32ToLiteralString(_tokenIdToHash[tokenId]),
                    html3,
                    contractInfo.code,
                    html4
                )
            ),
            '"}'
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(metadata)
                )
            );
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function bytes32ToLiteralString(
        bytes32 data
    ) public pure returns (string memory result) {
        bytes memory temp = new bytes(65);
        uint256 count;

        for (uint256 i = 0; i < 32; i++) {
            bytes1 currentByte = bytes1(data << (i * 8));

            uint8 c1 = uint8(bytes1((currentByte << 4) >> 4));

            uint8 c2 = uint8(bytes1((currentByte >> 4)));

            if (c2 >= 0 && c2 <= 9) temp[++count] = bytes1(c2 + 48);
            else temp[++count] = bytes1(c2 + 87);

            if (c1 >= 0 && c1 <= 9) temp[++count] = bytes1(c1 + 48);
            else temp[++count] = bytes1(c1 + 87);
        }

        result = string(temp);
    }
}
