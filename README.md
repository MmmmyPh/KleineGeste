# Kleine Geste

小型手势库

未完成

## 提供手势及可用属性

- `touchStart`

    - `touchCenter`：touchStart中心坐标

- `tap`

    - `tapCenter`：tap中心坐标

- `doubleTap`

    - `tapCenter`：tap中心坐标

- `longTap`

    - `longTapCenter`：longTap中心坐标

- `moving`

    - `direction`：当前滑动方向

    - `distance`：已滑动过的距离

- `swipe`

    - `direction`：当前滑动方向

    - `distance`：已滑动过的距离

    - `duration`: `swipe`使用的时间，在需要做缓动操作时有用

- `scale`

    - `scales`：缩放倍数

- `rotate`

    - `rotates`：旋转角度

> 中心坐标形式为：

```JavaScript
e.touchCenter = {
    x: this.t.x,
    y: this.t.y
};
```

> `direction`选项为：`top`, `down`, `left`, `right`