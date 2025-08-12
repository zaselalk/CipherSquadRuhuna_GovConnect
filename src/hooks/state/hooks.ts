import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

/**
 * Provides a typed version of the useDispatch hook.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/*
 * Provides a typed version of the useSelector hook.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
