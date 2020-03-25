import { v4 as uuid } from 'uuid';

export default () => {
  const hash = uuid();
  return hash.replace('-', '');
}