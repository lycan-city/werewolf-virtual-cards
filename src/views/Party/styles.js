import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  qrContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  currentPlayer: {
    color: 'mediumblue',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#fff',
  },
  activeCrown: {
    color: 'gold',
  },
  inactiveCrown: {
    color: 'gray',
  },
  kick: {
    color: 'tomato',
    fontSize: 25,
    marginLeft: 10,
  },
  qrLabel: {
    fontSize: 20,
    marginBottom: 5,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
  footer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
});
