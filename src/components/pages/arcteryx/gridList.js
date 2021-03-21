import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import tileData2 from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80vw',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(data) {
  const classes = useStyles();
  console.log('data', data.data)
let tileData = data.data[0] === "Test" ? [] : data.data
console.log('tileData', tileData)

  return (
    <div className={classes.root}>
      <GridList cellHeight={'95%'} className={classes.gridList} cols={4}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="h1">Arc'teryx LEAF</ListSubheader>
        </GridListTile>
        {tileData.map((tile,i) => (
          <GridListTile key={i}>
            <img src={tile[9]} alt={tile[2]} style={{width: 300, height: 300, position: 'center'}}/>
            <GridListTileBar
              title={tile[2]}
              subtitle={<span>Price: {tile[4]} <br/> Sizes: {tile[5]} <br/>Category: {tile[0]}</span>}
            //   actionIcon={
            //     <IconButton aria-label={`info about ${tile[2]}`} className={classes.icon}>
            //       <InfoIcon />
            //     </IconButton>
            //   }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
