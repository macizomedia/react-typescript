import { proxy, subscribe as valtioSubscribe, snapshot } from 'valtio'

export interface Store {
    title: string
    text: string
}

const store = proxy<Store>({
    title: '',
    text: '',
})

export const load = (client: string): void => {
    fetch(`http://localhost:4000/${client}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            store.title = data.title
            store.text = data.hero
        })
}

export const subscribe = (
  callback: (state: Store) => void
): (() => void) => {
  callback(snapshot(store));
  return valtioSubscribe(store, () => callback(snapshot(store)));
};

export default store