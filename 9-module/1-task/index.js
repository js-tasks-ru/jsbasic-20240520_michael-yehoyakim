export default function promiseClick(button) {
  const promise = new Promise((resolve, reject) => {
    button.addEventListener('click', (event) =>{
      resolve(event);
    });
  });

  return promise;
}
