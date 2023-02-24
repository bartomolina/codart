// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./CodArtLearn.sol";
import "./CodArtCertificate.sol";

//  _                _                        _ _                   _   _
// | |              | |                      | (_)                 | | | |
// | |__   __ _ _ __| |_ ___  _ __ ___   ___ | |_ _ __   __ _   ___| |_| |__
// | '_ \ / _` | '__| __/ _ \| '_ ` _ \ / _ \| | | '_ \ / _` | / _ \ __| '_ \
// | |_) | (_| | |  | || (_) | | | | | | (_) | | | | | | (_| ||  __/ |_| | | |
// |_.__/ \__,_|_|   \__\___/|_| |_| |_|\___/|_|_|_| |_|\__,_(_)___|\__|_| |_|
//

contract CodArtFactory is Ownable {
    address codArtLearnAddress;
    address codArtCertificateAddress;
    CodArtLearnInstance[] public codArtLearnInstances;
    CodArtCertificateInstance[] public codArtCertificateInstances;

    constructor() {
        codArtLearnAddress = address(new CodArtLearn());
        codArtCertificateAddress = address(new CodArtCertificate());
    }

    event NewCodArtLearnInstance(address indexed _instance);

    function createCodArtLearn(
        CodArtLearnInfo calldata contractInfo
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

    event NewCodArtCertificateInstance(address indexed _instance);

    function createCodArtCertificate(
        CodArtCertificateInfo calldata contractInfo
    ) public returns (address clone) {
        clone = Clones.clone(codArtCertificateAddress);

        CodArtCertificateInstance memory newCodArtCertificate = CodArtCertificateInstance(
            clone,
            contractInfo
        );
        codArtCertificateInstances.push(newCodArtCertificate);
        CodArtCertificate(clone).initialize(msg.sender, contractInfo);
        emit NewCodArtCertificateInstance(clone);
    }

    function getLearnInstances() external view returns (CodArtLearnInstance[] memory) {
        return codArtLearnInstances;
    }
    function getCertificateInstances() external view returns (CodArtCertificateInstance[] memory) {
        return codArtCertificateInstances;
    }
}
