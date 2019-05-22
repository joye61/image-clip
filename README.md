# image-clip

一个图片截取的React组件，本组件没有直接对图片做裁剪，而是在图形上获取原图上**待裁剪的矩形区域的坐标和尺寸**，得到了待裁剪区域，便可以做进一步的裁剪。

> 组件没有直接对截取区域进行裁剪，因为涉及到跨域的场景，直接用`canvas`无法`drawImage`，这种情况下获取待裁剪的区域坐标和尺寸，可以通过服务器做进一步的跨域裁剪。

<p style="display: flex;align-items: center;justify-content:space-around;">
  <img src="./assets/point.gif" alt="两点式裁剪" style="width:48%;"/>
  <img src="./assets/rect.gif" alt="矩形框式裁剪" style="width:48%;"/>
</p>

```typescript
// 组件可选参数
interface ImageClipOption {
  // 图片的来源，可以是链接或图片元素
  source: string | HTMLImageElement;
  onChange?: (res: ChangeResult) => void;
  // 可裁剪区域距离容器的padding
  containerPadding?: number;
  // 容器的尺寸
  containerWidth?: number;
  containerHeight?: number;

  // 可控制点或线的尺寸
  controllSize?: number;
  // 裁剪框的类型
  clipType?: ClipType;
  // 控制点的类型
  pointType?: PointType;
}
```

*TODO 文档待完善*