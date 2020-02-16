# mofron-effect-vrtpos
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

vertical position effect for mofron component

the component is positioned specified parameter that is 'center' or 'top' and 'bottom'.


# Install
```
npm install mofron mofron-effect-vrtpos
```

# Sample
```html
<require>
    <tag load="mofron-comp-text">Text</tag>
    <tag load="mofron-effect-vrtpos">VrtPos</tag>
</require>

<div size=(1.5rem,0.8rem) style="display:flex;" color2=[220,220,220]>
    <Text effect=VrtPos:"center">Vertical Position</Text>
</div>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | type | string | position type (center,top,bottom) |
| | | | undefined: call as getter |
| ◯  | offset | string(size) | offset size |
| | | | undefined: call as getter |

