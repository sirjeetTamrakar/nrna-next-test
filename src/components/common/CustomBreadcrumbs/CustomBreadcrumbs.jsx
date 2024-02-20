import Link from "next/link";
import { useLocation, useMatch } from "react-router-dom";
function CustomBreadcrumbs({ data }) {
  const location = useLocation();
  const matches = useMatch(":path/*");
  const paths = location.pathname.split("/").filter(Boolean);
  const isClickable = (path) => {
    // Define the paths where you want to disable the onClick event
    const disabledPaths = ["/accounts", "/payroll"];
    return !disabledPaths.includes(path);
  };
  const generateBreadcrumbs = (segments, currentIndex = 0) => {
    const currentPath = segments[currentIndex];
    const to = `/${segments.slice(0, currentIndex + 1).join("/")}`;
    const isActive = matches && matches.params.path === currentPath;
    const clickable = isClickable(to);

    return (
      <span key={to} style={{ textTransform: "capitalize" }}>
        {clickable ? (
          <Link
            href={to}
            style={{
              textDecoration: "none",
              color: "#383751",
              fontWeight: isActive && "900 !important",
            }}
          >
            {currentPath?.replaceAll("-", " ")}
          </Link>
        ) : (
          <span
            className="disabled"
            style={{
              textDecoration: "none",
              color: "#383751",
              fontWeight: isActive && "900 !important",
            }}
          >
            {currentPath?.replaceAll("-", " ")}
          </span>
        )}
        {currentIndex < segments.length - 1 && <span>{" > "}</span>}
        {currentIndex < segments.length - 1 &&
          generateBreadcrumbs(segments, currentIndex + 1)}
      </span>
    );
  };
  return <nav>{paths?.length > 1 && generateBreadcrumbs(paths)}</nav>;
}

export default CustomBreadcrumbs;
