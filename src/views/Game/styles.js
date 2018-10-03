import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  icon: {
    fontSize: 34,
  },
  nameAlive: {
    fontSize: 22,
  },
  nameDead: {
    color: 'darkred',
    fontSize: 22,
  },
  roleAlive: {
    fontSize: 17,
  },
  roleDead: {
    fontSize: 17,
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
  },
});
