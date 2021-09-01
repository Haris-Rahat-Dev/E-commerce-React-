import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import navLogo from '../../assets/navLogo.png'
import useStyles from './styles';

const Navbar = ({ totalItems }) => {

    const classes = useStyles();

    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={ Link } to="/" variant="h6" className={classes.title}>
                        <img  src={navLogo} alt="Gaming Solutions" height="35px" className={classes.image} />
                    </Typography>
                    <div className={classes.grow}/>
                      {/* <Link to="/cart">
                       </Link>*/}
                        {location.pathname === "/" &&  <div className={classes.button}>
                            <IconButton component={ Link } to="/cart" aria-label="Show cart Items">
                            <Badge badgeContent={ totalItems } color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        </div>}

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
