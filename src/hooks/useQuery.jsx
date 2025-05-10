import {useLocation} from "react-router-dom"
import { useMemo } from "react"

export const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}