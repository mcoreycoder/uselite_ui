import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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
    height: '95vh',
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

let gridMap = tileData.map((tile,i) => (
  <GridListTile key={i}>
    <img src={tile.img_src} alt={tile.title} style={{width: '85%', height: '85%', position: 'center'}}/>
    <GridListTileBar
      title={tile.title}
      subtitle={<span>Price: {tile.msrp} <br/> Sizes: {tile.Sizes} <br/>Category: {tile.category} <br/> Weight: {tile.Weight}</span>}
      actionIcon={
        <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={()=>console.log(`hovered on ${tile.title}`)}>
          <InfoIcon/>
        </IconButton>
      }
    />
  </GridListTile>
))


  return (
    <div className={classes.root}>
      <GridList cellheight={'85%'} className={classes.gridList} cols={4}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="h1">Arc'teryx LEAF</ListSubheader>
        </GridListTile>
        {gridMap}
      </GridList>
    </div>
  );
}
