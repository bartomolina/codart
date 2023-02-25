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

string constant cert_html1 = '<html><head><script src="';
string constant cert_html2 = '"></script><script>tokenData={hash: "';
string constant cert_html3 = '",minter: "';
string constant cert_html4 = '"};';
string constant cert_html5 = "</script></head><body><main></main></body></html>";

struct CodArtCertificateInfo {
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

struct CodArtCertificateInstance {
    address _address;
    CodArtCertificateInfo info;
}

contract CodArtCertificate is
    Initializable,
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;
    CodArtCertificateInfo private contractInfo;
    mapping(uint256 => string) private _tokenIdToHash;
    mapping(uint256 => string) private _tokenIdToMinter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _owner,
        CodArtCertificateInfo calldata _contractInfo
    ) public initializer {
        contractInfo = _contractInfo;
        __ERC721_init(contractInfo.name, contractInfo.symbol);
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __Ownable_init();
        transferOwnership(_owner);
        safeMint(_owner, "Owner");
    }

    function safeMint(address to, string memory minter) public payable {
        if (contractInfo.maxSupply > 0) {
            require(totalSupply() < contractInfo.maxSupply);
        }
        require(msg.value == contractInfo.price);
        require(bytes(minter).length > 2);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _tokenIdToHash[tokenId] = toHex(
            keccak256(abi.encodePacked(to, block.timestamp, block.difficulty))
        );
        _tokenIdToMinter[tokenId] = minter;
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

    function approve(
        address to,
        uint256 tokenId
    ) public virtual override(ERC721Upgradeable, IERC721Upgradeable) {
        revert("disabled");
    }

    function setApprovalForAll(
        address operator,
        bool approved
    ) public virtual override(ERC721Upgradeable, IERC721Upgradeable) {
        revert("disabled");
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
            '","description":"',
            contractInfo.description,
            '","animation_url":"data:text/html;base64,',
            Base64.encode(
                abi.encodePacked(
                    cert_html1,
                    contractInfo.libraryURL,
                    cert_html2,
                    _tokenIdToHash[tokenId],
                    cert_html3,
                    _tokenIdToMinter[tokenId],
                    cert_html4,
                    contractInfo.code,
                    cert_html5
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

    function toHex16(bytes16 data) internal pure returns (bytes32 result) {
        result =
            (bytes32(data) &
                0xFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000) |
            ((bytes32(data) &
                0x0000000000000000FFFFFFFFFFFFFFFF00000000000000000000000000000000) >>
                64);
        result =
            (result &
                0xFFFFFFFF000000000000000000000000FFFFFFFF000000000000000000000000) |
            ((result &
                0x00000000FFFFFFFF000000000000000000000000FFFFFFFF0000000000000000) >>
                32);
        result =
            (result &
                0xFFFF000000000000FFFF000000000000FFFF000000000000FFFF000000000000) |
            ((result &
                0x0000FFFF000000000000FFFF000000000000FFFF000000000000FFFF00000000) >>
                16);
        result =
            (result &
                0xFF000000FF000000FF000000FF000000FF000000FF000000FF000000FF000000) |
            ((result &
                0x00FF000000FF000000FF000000FF000000FF000000FF000000FF000000FF0000) >>
                8);
        result =
            ((result &
                0xF000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000) >>
                4) |
            ((result &
                0x0F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F00) >>
                8);
        result = bytes32(
            0x3030303030303030303030303030303030303030303030303030303030303030 +
                uint256(result) +
                (((uint256(result) +
                    0x0606060606060606060606060606060606060606060606060606060606060606) >>
                    4) &
                    0x0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F) *
                39
        );
    }

    function toHex(bytes32 data) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "0x",
                    toHex16(bytes16(data)),
                    toHex16(bytes16(data << 128))
                )
            );
    }
}
