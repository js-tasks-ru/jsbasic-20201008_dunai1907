/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let list = friends.map(friend => (`${friend.firstName} ${friend.lastName}`));
  let ul = document.createElement('ul');
  for (let i =0; i < list.length; i++){
    ul.innerHTML += '<li>' + list[i] + '</li>';
  }
  return ul;
}
