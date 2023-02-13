import React from "react";

const DBAMEContext = React.createContext();

export default DBAMEContext;


// export const ContextManager = createContext(() => {

//     const [idNumber, setIdNumber] = useState('a');
//     const [firstName, setFirstName] = useState('b');
//     const [lastName, setLastName] = useState('c');
//     const [dob, setDob] = useState('d');
//     const [publicKey, setPublicKey] = useState('e');
//     const [s, setS] = useState('f');
//     const [w, setW] = useState('g');
//     const [eBC1, setEBC1] = useState('h');
//     const [eBC2, setEBC2] = useState('i');
//     const [encryptedBallot, setEncryptedBallot] = useState('j');
//     const [ephemeralKey, setEphemeralKey] = useState('k');
//     const [privateKey, setPrivateKey] = useState('l');

//     return ({
//         idNumber, setIdNumber,
//         firstName, setFirstName,
//         lastName, setLastName,
//         dob, setDob,
//         publicKey, setPublicKey,
//         s, setS,
//         w, setW,
//         eBC1, setEBC1,
//         eBC2, setEBC2,
//         encryptedBallot, setEncryptedBallot,
//         ephemeralKey, setEphemeralKey,
//         privateKey, setPrivateKey,
//     });
// });

