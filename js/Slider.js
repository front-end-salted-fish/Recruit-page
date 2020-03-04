var THREE = require('three')
// import dispImage from '../img/displacement.png'
// import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import $ from 'jquery'
import {
  TweenMax
} from 'gsap'

function clearRequestInterval(handle) {
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) : clearInterval(handle);
}

function requestInterval(fn, delay) {
  var requestAnimFrame = (function () {
      return window.requestAnimationFrame || function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
    })(),
    start = new Date().getTime(),
    handle = new Object();

  function loop() {
    handle.value = requestAnimFrame(loop);
    var current = new Date().getTime(),
      delta = current - start;
    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }
  };

  handle.value = requestAnimFrame(loop);
  return handle;
}

function isInViewport(elem) {
  const scroll = window.scrollY || window.pageYOffset
  const boundsTop = elem.getBoundingClientRect().top + scroll

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight,
  }
  const bounds = {
    top: boundsTop,
    bottom: boundsTop + elem.clientHeight,
  }

  const inview = (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top);

  return inview;
}

function initForElem(elem, text) {
  if (text == '') {
    elem.innerHTML = ''
    return
  }
  elem.innerHTML = text;
}

export default class Slider {
  constructor() {
    this.variables = { // 变量数据
      ease: [.165, .84, .44, 1],
      transition: 400,
      transition_fast: 250,
      transition_slow: 800,
      transition_slow__inS: .800,
    }
  }

  // 初始化
  initialize() {
    const t = this

    this.windowX = window.innerWidth / 2 // 窗口宽度 /2
    this.windowY = window.innerHeight / 2 // 窗口高度 /2

    this.parent = document.querySelector('#slider') // 轮播图模块
    this.imgs = Array.from(t.parent.querySelectorAll('img')) // 轮播图数组
    this.sliderImages = [] // 轮播图图片
    this.material = null // 材料
    this.effectIntensity = 0.3 // 效果强度
    this.animationDuration = this.variables.transition_slow__inS // 动画的持续时间
    this.slideTitleX = 0
    this.animationBlur = 10
    this.animationY = 20
    this.nbSlide = this.imgs.length // 轮播图数目
    this.currentSlide = 0 // 当前轮播图
    this.nextSlide = 0 // 下个轮播图
    this.slideDirection = 1 // 滑动方向
    this.isAnimating = false // 是否正在动画中
    this.nextSlideTitle = ''
    this.nextSlideSubTitle = ''

    this.vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `

    this.fragment = `
        varying vec2 vUv;

        uniform sampler2D texture;
        uniform sampler2D texture2;
        uniform sampler2D disp;

        uniform float dispFactor;
        uniform float effectFactor;

        void main() {

            vec2 uv = vUv;

            // uv -= 0.5;
            // vec2 rotUV = rotate(uv, _rot);
            // uv += 0.5;

            vec4 disp = texture2D(disp, uv);

            vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
            vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

            vec4 _texture = texture2D(texture, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture, _texture2, dispFactor);

            gl_FragColor = finalTexture;
            // gl_FragColor = disp;
        }
    `
    let renderWidth = this.parent.offsetWidth,
      renderHeight = this.parent.offsetHeight; // canvas高度宽度

    let renderer = new THREE.WebGLRenderer({
      antialias: false,
    }); // canvas
    this.renderer = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1.0); // 初始颜色黑底
    renderer.setSize(renderWidth, renderHeight)
    this.parent.appendChild(renderer.domElement); // 将canvas放进DOM

    let scene = new THREE.Scene()
    this.scene = scene
    scene.background = new THREE.Color(0x000000)


    let camera = new THREE.OrthographicCamera(
      renderWidth / -2,
      renderWidth / 2,
      renderHeight / 2,
      renderHeight / -2,
      1,
      1000
    )
    camera.position.z = 1

    let image,
      loader = new THREE.TextureLoader()
    // loader.setCrossOrigin( "Anonymous" );
    loader.crossOrigin = "";
    let dispImage = "https://education.topviewclub.cn/homework-file/2020-2-19/6f4dfe5afc2f4938a62f32cc574ae0301582118751737/displacement.png";
    let disp = loader.load(dispImage)

    disp.wrapS = disp.wrapT = THREE.RepeatWrapping; // 1000

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        effectFactor: {
          type: "f",
          value: t.effectIntensity
        },
        dispFactor: {
          type: "f",
          value: 0.0
        },
        texture: {
          type: "t",
          value: t.sliderImages[0]
        },
        texture2: {
          type: "t",
          value: t.sliderImages[1]
        },
        disp: {
          type: "t",
          value: disp
        }
      },
      vertexShader: t.vertex,
      fragmentShader: t.fragment,
      transparent: true,
      opacity: 1.0
    })

    let i = 0;
    this.imgs.forEach((img) => {
      let src = img.getAttribute('src');

      if (i === 0) {
        image = loader.load(src + '?v=' + Date.now(), (texture) => {

          const ratio = texture.image.width / texture.image.height

          let w = renderHeight * ratio,
            h = renderHeight;

          if (w < renderWidth) {
            w = renderWidth
            h = renderWidth / ratio
          }

          let geometry = new THREE.PlaneBufferGeometry(
            w,
            h,
            1
          )
          let object = new THREE.Mesh(geometry, t.material)
          scene.add(object)
          // t.isInit()
        })
      } else {
        image = loader.load(src + '?v=' + Date.now())
      }

      image.magFilter = image.minFilter = THREE.LinearFilter
      image.anisotropy = renderer.capabilities.getMaxPrecision()

      t.sliderImages.push(image);
      i++;
    })

    // Events > Resize 重新渲染 canvas 大小
    window.addEventListener('resize', debounce((e) => {
      if(window.innerWidth < 980) return ;
      t.windowX = window.innerWidth / 2
      t.windowY = window.innerHeight / 2
      renderWidth = t.parent.offsetWidth
      renderHeight = t.parent.offsetHeight
      if(!t.isAnimating)  {
        renderWidth = $(t.parent).width();
        renderHeight = $(t.parent).height();
      }
      renderer.setSize(renderWidth, renderHeight)
    }, 200))

    // Events > RAF
    this.updating = false
    this.RAF_ID = null
    this.animate = function () {
      if (t.updating) {
        t.RAF_ID = requestAnimationFrame(t.animate)
      }
      renderer.render(scene, camera)

    }
    this.startAnimate = function () {
      this.updating = true
      this.RAF_ID = null
      this.animate()
    }
    this.cancelAnimate = function () {
      this.updating = false
      this.RAF_ID = null
      cancelAnimationFrame(this.RAF_ID)
    }

    this.renderWidth = renderWidth
    this.renderHeight = renderHeight
  }

  init() {
    const t = this

    const parent = this.parent,
      sliderImages = this.sliderImages,
      mat = this.material,
      slideDuration = 4000

    this.timer = null

    this.sliderBox = null
    this.pagination = parent.querySelector('#slider-pagination')
    this.pagButtons = Array.from(t.pagination.querySelectorAll('button'))
    this.pagTimer = t.pagination.querySelector('.slider__pagination__timer')
    this.pagTimerTween = null
    this.pageCurrent = parent.querySelector('#slider-pages-current')

    this.slideTitleEl = parent.querySelector('#slide-title')
    this.slideSubTitleEl = parent.querySelector('#slide-subtitle')

    this.sliderButtonPrev = parent.querySelector('.svg-pre-container');
    this.sliderButtonNext = parent.querySelector('.svg-next-container');


    // 获取下一轮播图的信息
    this.getNextSlideInfos = function () {
      const parent = this.parent,
        mat = this.material;

      this.nextSlideTitle = $(`[data-slide-title="${this.nextSlide}"]`).text();
      this.nextSlideSubTitle = $(`[data-slide-subtitle="${this.nextSlide}"]`).text();

      mat.uniforms.texture2.value = this.sliderImages[this.nextSlide]
      mat.uniforms.texture2.needsUpdate = true
    }

    // 改变方向
    this.changeSliderDirection = function () {
      const mat = this.material
      mat.uniforms.effectFactor.value = this.effectIntensity * this.slideDirection
    }

    // 初始化title信息
    this.initSlideTitle = function () {
      initForElem(this.slideTitleEl, this.nextSlideTitle)
    }

    // 初始化轮播图分页按钮
    this.initPagination = function () {
      const t = this;
      this.pagButtons.forEach((el) => {
        el.addEventListener('click', function () {
          if (!t.isAnimating) {

            t.startAnimate()
            t.isAnimating = true
            t.nextSlide = parseInt(this.dataset.slide, 10)

            t.pagination.querySelectorAll('.active')[0].className = ''
            this.className = 'active'

            // Get the direction of the slider (next or previous)
            t.slideDirection = t.nextSlide < t.currentSlide ? -1 : 1

            t.changeSliderDirection()
            t.getNextSlideInfos()
            t.initInterval()
            // console.log(mat.uniforms.dispFactor);

            TweenMax.to(mat.uniforms.dispFactor, t.animationDuration, {
              value: 1,
              ease: 'Expo.easeInOut',
              onComplete: function () {
                mat.uniforms.texture.value = sliderImages[t.nextSlide]
                mat.uniforms.texture.needsUpdate = true
                mat.uniforms.dispFactor.value = 0.0
                t.isAnimating = false
                t.currentSlide = t.nextSlide
                t.cancelAnimate()
              }
            })

            // Animate the Slide Title
            TweenMax.fromTo(t.slideTitleEl, t.animationDuration / 2, {
              autoAlpha: 1,
              filter: 'blur(0px)',
              y: 0
            }, {
              autoAlpha: 0,
              filter: 'blur(' + t.animationBlur + 'px)',
              y: t.animationY,
              ease: 'Expo.easeIn',
              onComplete: function () {
                t.initSlideTitle()
                TweenMax.to(t.slideTitleEl, t.animationDuration / 2, {
                  autoAlpha: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  delay: 0.1
                })
              }
            })

            // Animate the Slide Pre-title
            // TweenMax.fromTo( t.slidePreTitleEl, t.animationDuration / 2,
            //     {
            //         autoAlpha: 1,
            //         filter   : 'blur(0px)',
            //         y        : 0
            //     },
            //     {
            //         autoAlpha: 0,
            //         filter   : 'blur(' + t.animationBlur + 'px)',
            //         y        : t.animationY,
            //         ease     : 'Expo.easeIn',
            //         onComplete: function () {
            //             t.slidePreTitleEl.innerHTML = t.nextSlidePreTitle

            //             TweenMax.to( t.slidePreTitleEl, t.animationDuration / 2, {
            //                 autoAlpha: 1,
            //                 filter   : 'blur(0px)',
            //                 y        : 0
            //             })
            //         }
            //     }
            // )

            // Animate the Slide Sub-title
            TweenMax.fromTo(t.slideSubTitleEl, t.animationDuration / 2, {
              autoAlpha: 1,
              filter: 'blur(0px)',
              y: 0
            }, {
              autoAlpha: 0,
              filter: 'blur(' + t.animationBlur + 'px)',
              y: t.animationY,
              ease: 'Expo.easeIn',
              onComplete: function () {
                t.slideSubTitleEl.innerHTML = t.nextSlideSubTitle

                TweenMax.to(t.slideSubTitleEl, t.animationDuration / 2, {
                  autoAlpha: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  delay: 0.2,
                  onComplete: function () {
                    // t.initSlideLinks()
                  }
                })
              }
            })

            // 当前页数字
            TweenMax.fromTo( t.pageCurrent, t.animationDuration / 2,
                {
                    autoAlpha: 1,
                    x        : 0
                },
                {
                    autoAlpha: 0,
                    x        : t.animationY * (t.slideDirection * -1),
                    ease     : 'Expo.easeIn',
                    onComplete: function () {
                        t.pageCurrent.innerHTML = '0' + (t.nextSlide + 1)

                        TweenMax.to( t.pageCurrent, t.animationDuration / 2, {
                            autoAlpha: 1,
                            x        : 0
                        })
                    }
                }
            )

          }

        })

      })
    }

    // Go to next slide
    this.next = () => {
      var next = this.currentSlide + 1
      if (next >= this.nbSlide) {
        next = 0
      }
      this.pagination.querySelector('[data-slide="' + next + '"]').click()
    }

    // 上下页
    this.onSliderSidesClick = e => {
      const t = this
      this.nextSlide = $(e.currentTarget).hasClass('svg-next-container') ? this.currentSlide + 1 : this.currentSlide - 1
      if (this.nextSlide >= this.nbSlide) {
        this.nextSlide = 0
      } else if (this.nextSlide < 0) {
        this.nextSlide = this.nbSlide - 1
      }
      this.getNextSlideInfos()
      // Go to slide
      const newDot = this.pagination.querySelector(`[data-slide="${this.nextSlide}"]`)
      if (newDot) {
        newDot.click()
        // this.bumpCursorTween.play()
      }
    }

    // 自动轮播
    this.initInterval = (reset = true) => {
      if (this.timer) {
        clearRequestInterval(this.timer);
        this.timer = null
        if (this.pagTimerTween !== null) {
          // this.pagTimerTween.kill()
          this.pagTimerTween = null
          TweenMax.set(this.pagTimer, {
            scaleX: 0
          })
        }
      }
      if (reset) {
        this.timer = requestInterval(this.next, slideDuration)
        this.pagTimerTween = TweenMax.to(this.pagTimer, slideDuration / 1000, {
          scaleX: 1
        })
      }
    }

    // 添加事件
    this.addEvents = function () {
      this.initPagination()
      this.initInterval()
      $(this.sliderButtonPrev).on('click', this.onSliderSidesClick);
      $(this.sliderButtonNext).on('click', this.onSliderSidesClick);
    }
    this.addEvents()

    // scroll
    this.startSlider = function () {
      this.startAnimate()
      this.initInterval()
    }
    this.stopSlider = function () {
      // console.log('stopSlider');
      this.cancelAnimate()
      this.initInterval(false)
    }
    // this.isInViewport = isInViewport(t.parent)
    // if (this.isInViewport) {
    //   this.startIsInViewport()
    // }
    this.pagination.querySelector(`[data-slide="0"]`).click();

  }
}