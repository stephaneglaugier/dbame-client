import React from 'react';
import { View } from 'react-native';
import Candidate from './Candidate';
import DBAMEContext from './Context';

const Ballot = () => {

  const context = React.useContext(DBAMEContext);

  const handleSwitchChange = (index, value) => {
    context.setVotes((prevValues) => {
      const newValues = prevValues.map(() => false);
      newValues[index] = value;
      return newValues;
    });
  };

  return (
    <View>
      {context.candidates.map((name, index) => (
        <Candidate
          key={index}
          text={name}
          value={context.votes[index]}
          onValueChange={(value) => handleSwitchChange(index, value)}
        />
      ))}
    </View>
  );
};

export default Ballot;
