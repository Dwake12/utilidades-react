import { Square } from "./Square"

export function ChangeTurn ({stateTurn,TURNS}) {
    return(
        <section className='turn'>
            <Square isSelected={stateTurn === TURNS.X}>
                {TURNS.X}
            </Square>
            <Square isSelected={stateTurn === TURNS.O}>
                {TURNS.O}
            </Square>
      </section>
    )
}