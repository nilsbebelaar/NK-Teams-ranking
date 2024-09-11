# Team ranking atletiek.nu to simple webpage
Checkout https://team-graph.nilsb.nl for a preview.
Data is pulled from atletiek.nu (through a proxy that strips CORS headers) on page-load and shown in one single graph.

## Usage

The following parameters are available:
- ```title``` 
- ```size```
- ```wideLayout```
- ```id```
- ```list```

### ```title```
Can be set to any value, it will be displayed in adition to the graph. 

If no title is supplied, the graph will become fullscreen.

### ```size```
Optimized presets for different screens. The graph will always fill the entire screen, but the text wont scale properly.

Presets are made:
- ```size=small``` for 416px x 208px
- ```size=medium``` for 768px x 384px

### ```wideLayout```
Can be used to show the header left of the graph instead of on top.

### ```id```
Competition ID where team data should be pulled from, can be found from the url: <ins>ww<span>w.atl</span>etiek.nu/wedstrijd/teams/<b>41386</b></ins>

### ```list```
List ID of what category should be displayed. Can be found from the url once you select a category: <ins>ww<span>w.atl</span>etiek.nu/wedstrijd/teams/41386/#ranglijst<b>408797</b></ins>


## Examples
> https://team-graph.nilsb.nl?size=medium&wideLayout&id=41383&list=409166&title=Vrouwen

> https://team-graph.nilsb.nl?size=medium&wideLayout&id=41383&list=409167&title=Mannen
