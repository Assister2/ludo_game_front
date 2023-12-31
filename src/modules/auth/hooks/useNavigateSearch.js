import { createSearchParams, useNavigate } from "react-router-dom";

export default function useNavigateSearch(replace = false) {
  const navigate = useNavigate();
  return (pathname, params) =>
    navigate(
      { pathname, search: `?${createSearchParams(params)}` },
      { replace }
    );
}
