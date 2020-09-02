import { configureStore } from '@reduxjs/toolkit';
import reducer from "./store/reducers/reducer";

export default function () {
    return configureStore({ reducer });
}
