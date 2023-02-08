// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./CodArtLearn.sol";

//  _                _                        _ _                   _   _
// | |              | |                      | (_)                 | | | |
// | |__   __ _ _ __| |_ ___  _ __ ___   ___ | |_ _ __   __ _   ___| |_| |__
// | '_ \ / _` | '__| __/ _ \| '_ ` _ \ / _ \| | | '_ \ / _` | / _ \ __| '_ \
// | |_) | (_| | |  | || (_) | | | | | | (_) | | | | | | (_| ||  __/ |_| | | |
// |_.__/ \__,_|_|   \__\___/|_| |_| |_|\___/|_|_|_| |_|\__,_(_)___|\__|_| |_|
//

contract CodArtLearnFactory is Ownable {
    address codArtLearnAddress;

    struct CodArtLearnStruct {
        address addr;
        address owner;
        string name;
        string symbol;
        uint256 maxSupply;
        uint256 price;
        string _library;
        string code;
    }
    CodArtLearnStruct[] public codArtLearnInstances;

    constructor() {
        codArtLearnAddress = address(new CodArtLearn());
    }

    event NewCodArtLearnInstance(address indexed _instance);

    function createCodArtLearn(
        string calldata name,
        string calldata symbol,
        uint256 maxSupply,
        uint256 price,
        string calldata _library,
        string calldata code
    ) public payable returns (address clone) {
        clone = Clones.clone(codArtLearnAddress);

        CodArtLearnStruct memory newCodArtLearn = CodArtLearnStruct(
            clone,
            msg.sender,
            name,
            symbol,
            maxSupply,
            price,
            _library,
            code
        );
        codArtLearnInstances.push(newCodArtLearn);
        CodArtLearn(clone).initialize(
            msg.sender,
            name,
            symbol,
            maxSupply,
            price,
            _library,
            code
        );
        emit NewCodArtLearnInstance(clone);
    }

    function getInstances() external view returns (CodArtLearnStruct[] memory) {
        return codArtLearnInstances;
    }
}
