import { Square } from "./Square"

export function BoardTable ({board,updateBoard}) {
    return (
        <section className='game'>
        {
          // En este metodo .map el _ representa el valor o el contenido de ese array en este caso es (null) y el index representa la posicion del elemento en el array (0,1,2,3...)
          board.map((_,index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
    )
}