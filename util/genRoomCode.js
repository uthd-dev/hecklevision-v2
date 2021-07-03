import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

uid.setDictionary('alphanum_lower');

export default function genRoomCode() {
    return uid();
}