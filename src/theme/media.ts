const sizes = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
};

export const media = {
  mobile: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

export { sizes };
export default media;
