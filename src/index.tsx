/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App.tsx'
import './global.css'

const root = document.querySelector('body')

render(() => <App />, root!)
