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
    <tag load="mofron-effect-vrtpos">VrtPos</tag>
</require>
<div size=(100%,0.5rem) style="display:flex;">
    <Text effect=VrtPos("top")>Vertical Position</Text>
</div>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | type | string | position type (center,top,bottom) |
| ◯  | offset | string | offset size (css value) |

