const list = document.querySelector('#games');
const titleInput = document.querySelector('#title');
const yearInput = document.querySelector('#year');
const princeInput = document.querySelector('#price');
const idInputedit = document.querySelector('#id-edit');
const titleInputEdit = document.querySelector('#title-edit');
const yearInputEdit = document.querySelector('#year-edit');
const princeInputEdit = document.querySelector('#price-edit');
const btnEdit = document.querySelector('#btn-edit');
const btnEditCancel = document.querySelector('#btn-edit-cancel');

axios.get('http://localhost:8181/games').then((response) => {
   let games = response.data;
   games.forEach((game) => {    
      let item = document.createElement('li');
      let btnDelete = document.createElement('button');
      let btnUpdate = document.createElement('button');

      btnDelete.innerText = 'Delete'
      btnUpdate.innerText = 'Editar'
      item.innerHTML = `${game.id} - ${game.title} - R$ ${game.price}`;

      list.appendChild(item);
      item.appendChild(btnDelete);
      item.appendChild(btnUpdate);

      btnDelete.addEventListener('click', () => {
         if (window.confirm('Deseja continuar?')) {
            axios.delete(`http://localhost:8181/game/${game.id}`).then(() => {
               alert('Game deletado');
               location.reload();
            }).catch((erro) => {
               alert('Nenhum game foi deletado');
            })              
         } else {
            alert('Cancelado pelo usuario');
         }                
      });
      
      btnUpdate.addEventListener('click', () => {
         
         titleInputEdit.removeAttribute('disabled');
         yearInputEdit.removeAttribute('disabled');
         princeInputEdit.removeAttribute('disabled');
         btnEdit.removeAttribute('disabled');
         btnEditCancel.removeAttribute('disabled');
         idInputedit.value = game.id
         titleInputEdit.value = game.title;
         yearInputEdit.value = game.year;
         princeInputEdit.value = game.price;

      });     
   });
}).catch((erro) => {
    console.log(erro);
});

const creatGame = () => {
   let game = {
      title: titleInput.value,
      year: yearInput.value,
      price: princeInput.value
   }
   axios.post('http://localhost:8181/game', game).then((response) => {
      if (response.status == 200) {
         alert('Game adicionado"')
      }
   }).catch((erro) => {
      console.log(erro);
   })
   location.reload();
}

const cancelEdit = () => {
   location.reload();
}

const gameEdit = () => {

   let gameUpdate = {
      title: titleInputEdit.value,
      year: yearInputEdit.value,
      price: princeInputEdit.value
   }
   axios.put(`http://localhost:8181/game/${idInputedit.value}`, gameUpdate).then((response) => {
      if (response.status == 200) {
         alert('Game atualizado!')
         location.reload();
      }else{
         alert('Nenhum game foi atualizado')
      }
   }).catch((erro) => {
      alert('Erro intero do servidor')
   })
}