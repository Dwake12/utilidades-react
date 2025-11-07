export const chekEndGame = (newBoard) => {
    // Revisar si hay empate, se le envia el newBoard para que verifique si en todas las posciones del array hay una X u O, en ese caso se considera que el juego es un empate ya que todas las posciones del array tienen un valor y no se detecto un combo ganador.
    return newBoard.every((Square) => Square !== null)
  }