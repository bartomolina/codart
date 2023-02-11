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
    CodArtLearnInstance[] public codArtLearnInstances;

    constructor() {
        codArtLearnAddress = address(new CodArtLearn());
    }

    event NewCodArtLearnInstance(address indexed _instance);

    function createCodArtLearn(
        CodArtLearInfo calldata contractInfo
    ) public returns (address clone) {
        clone = Clones.clone(codArtLearnAddress);

        CodArtLearnInstance memory newCodArtLearn = CodArtLearnInstance(
            clone,
            contractInfo
        );
        codArtLearnInstances.push(newCodArtLearn);
        CodArtLearn(clone).initialize(msg.sender, contractInfo);
        emit NewCodArtLearnInstance(clone);
    }

    function getInstances() external view returns (CodArtLearnInstance[] memory) {
        return codArtLearnInstances;
    }
}
