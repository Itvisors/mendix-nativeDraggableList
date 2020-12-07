## NativeDraggableList
Native draggable list, allow users to reorder items in a list

## Features
- Smooth drag/drop action
- Visual shadow effect when item is dragged
- Use your own content for the drag handle and contents
- Easy to style

## Limitations
- Currently pluggable widgets cannot change data in a datasource so the widget sets a JSON string on the context upon drop

## Context entity
The widget needs a context to place the drop data in. Make sure it has an unlimited string to contain the drop data JSON

## Usage
- Place the widget on your native page in a dataview.
- Choose whether to start the drag when pressing on the item or after a longpress.
- Your context entity must have an unlimited string to hold the drop data
- Configure the datasource
- Place content in the drag handle (for example an image that indicates dragging is possible) and content place holders
- Input elements and buttons are best placed in the content place holder, not in the drag handle.
- Configure the drop data and on drop action, which needs to be a nanoflow as you need to process the drop data

## Handle the drop
Appstore module [NanoflowCommonsITvisors](https://appstore.home.mendix.com/link/app/110104/ITvisors/Nanoflow-Commons-ITvisors)
has entity `DropDataItem` and JavaScript action `ParseNativeDraggableListDropData`
that will parse the JSON drop data from the widget into a list of `DropDataItem` objects.
You may use your own entity if you prefer, just make sure it is non-persistent and contains (at least) the attributes `DropDataItem` has.

The on drop action must be a nanoflow. In your nanoflow, call JavaScript action `NanoflowCommonsITvisors.ParseNativeDraggableListDropData`
to get a list of non-persistent objects for each of the items in the list.
For each item in the list, get the corresponding object and update its sequence number with the value of the drop data item.

At the end of your nanoflow, be sure to clear the drop data string of your context object to clean it up.

Be sure to commit your objects using a list, not inside the loop to prevent a lot of unnecessary renders of your page.

## Styling
The widget can be styled by creating a class that overrules the defaults.
Entries in the style object:
- **container** - The widget container. Must have `flex=1`
- **itemViewContainer**: - Outermost container of one item, has some padding to reserve space for the shadow effect. Must have `flex=1`
- **itemView**: - Will contain the drag handle and the content. By default uses `flexDirection=row`
- **draggingItemView** - Will replace itemView when the item is being dragged. By default uses a shadow effect to indicate the drag
- **itemContentView** - Will contain the item content, placed next to the drag handle. Has `flex=1` by default.
- **errorText** - Used to display an error
