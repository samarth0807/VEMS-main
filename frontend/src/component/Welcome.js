import { Grid, Typography } from "@material-ui/core";
import img from './img.jpg'; // Tell webpack this JS file uses this image

const Welcome = (props) => {
  return (
    <Grid container>
    <Grid item xs={6}> 
    <img src={img} alt="Logo" />
    </Grid>
    <Grid item xs={5} style={{ padding: "30px", fontSize: 20}}>
      <div >
VEMS is a group of highly qualified and committed people in the field of business promotion. We have a vast experience in import and export services. The world economy is passing through a great crisis. It has adversely affected both manufacturing and service industry. There is a fear in the mind of people how to boost business in the post Corona World.


VEMS is surely a ray of hope for all those who want to promote their business in different domains.There are always buyers for products and services in the world. Reaching out to them is necessary. If you are a manufacturer or service provider, you need not worry. VEMS is always at your service to promote your business.


      </div>
    </Grid>
</Grid>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
