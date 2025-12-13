import { Box } from "@mui/material";

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => (
  <Box
    component="div"
    sx={{
      width: 64,
      height: 64,
      borderRadius: 2,
      backgroundImage: `url('${src}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      flexShrink: 0,
    }}
    role="img"
    aria-label={alt}
  />
);

export default ProductImage;
