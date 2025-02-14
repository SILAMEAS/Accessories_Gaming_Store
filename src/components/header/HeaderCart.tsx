import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Badge, Box, Button, ButtonProps, Card, CardContent, IconButton, Typography} from "@mui/material";
import DrawerCustom from "../Drawer/DrawerCustom.tsx";
import {useDeleteCartMutation, useGetAllCartsQuery} from "../../redux/services/cartApi.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmptyCart from "../../utils/ui/empty/EmptyCart.tsx";

const HeaderCart = (props: ButtonProps) => {
  const defaultStyle = {
    color: "primary.main",
    p: 0,
  };
  const {currentData,isLoading}=useGetAllCartsQuery({});
  const [deleteCart]=useDeleteCartMutation({})
    if(!currentData||isLoading){
        return  <>loading ...</>
    }
    let subtotal = 0;
  return (
      <DrawerCustom
          renderButton={<IconButton {...props} sx={defaultStyle}>
              <Badge badgeContent={currentData.total} color="primary">
                  <ShoppingCartOutlinedIcon sx={{color:"white"}}/>
              </Badge>
          </IconButton>}
          anchor={"right"}
          bgcolor={"white"}
      >
              <Box p={2} maxWidth={400} mx="auto" borderRadius={2} boxShadow={2}>
                  {/* Header */}
                  <Box display="flex" alignItems="center" gap={1}>
                      <ShoppingCartIcon />
                      <Typography variant="h6">Shopping Cart</Typography>
                  </Box>

                  {currentData?.contents?.length<=0? <EmptyCart/>:
                      (  currentData?.contents?.map(item=>{
                          subtotal = subtotal+item.total_price;
                          return  <Card sx={{ mt: 2, display: "flex", alignItems: "center", p: 1 }}>
                              <img src={item.image} alt={item.image} width={60} height={60} style={{ borderRadius: 8 }} />
                              <CardContent sx={{ flexGrow: 1 }}>
                                  <Typography variant="body1">{item.name}</Typography>
                                  <Typography variant="body2">{item.quantity} × ${Number(item.price).toFixed(2)}</Typography>
                              </CardContent>
                              <IconButton color="error" onClick={async ()=>{
                                  try {
                                      await deleteCart({cartId:item.id}).unwrap()
                                  }catch (e){
                                      console.error('Delete Cart ',e)
                                  }
                              }}>
                                  <DeleteIcon />
                              </IconButton>
                          </Card>
                      })
                  )}

                  {/* Subtotal & Actions */}
                  <Box mt={2} p={2} bgcolor="grey.100" borderRadius={2}>
                      <Typography variant="subtitle2" fontWeight="bold">SUBTOTAL:</Typography>
                      <Typography variant="h6" fontWeight="bold">${subtotal.toFixed(2)}</Typography>
                  </Box>

                  <Box mt={2} display="flex" flexDirection="column" gap={1}>
                      <Button variant="outlined" fullWidth>View Cart</Button>
                      <Button variant="contained" fullWidth sx={{ background: "linear-gradient(to right, purple, pink)" }}>
                          Checkout
                      </Button>
                  </Box>
              </Box>

      </DrawerCustom>
  );
};

export default HeaderCart;
