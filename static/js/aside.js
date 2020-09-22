var getElementTopToScreenTop = function(element) {
  var elementOffsetTop = element.offset().top
  var windowScrollTop = $(window).scrollTop()
  return elementOffsetTop - windowScrollTop
}

var getElementBottomToScreenBottom = function(element) {
  return $(window).height() + $(document).scrollTop() - element.offset().top - element.height()
}

var getElementBottomToTop = function(element) {
  var elementHeight = element.outerHeight()
  var elementOffsetTop = element.offset().top
  return elementOffsetTop + elementHeight
}

var bindAsideScroll = function() {
  var screenWidth = $(window).width()
  if (screenWidth <= 768) {
    return false
  }
  var content = $('.middle-div')
  var mdBody = $('.md-body')
  var aside = $('.aside')
  var contentToTop = getElementTopToScreenTop(content)
  aside.css("top", contentToTop)
  var asideInner = $('.aside .inner-div')
  scrollEvent(content, mdBody, aside, asideInner)
}

var bindLeftTreeScroll = function() {
  var screenWidth = $(window).width()
  if (screenWidth <= 768) {
    return false
  }
  var content = $('.middle-div')
  var mdBody = $('.md-body')
  var aside = $('.common-layout .left-tree')
  var contentToTop = getElementTopToScreenTop(content)
  aside.css("top", contentToTop)
  var asideInner = $('.left-div .inner-tree')
  scrollEvent(content, mdBody, aside, asideInner)
}

var scrollEvent = function(content, mdBody, aside, asideInner) {
  $( window ).scroll(function() {
    var headerHeight = $('header').outerHeight()
    var contentToTop = getElementTopToScreenTop(content)
    if (contentToTop < headerHeight) {
      aside.css("top", headerHeight + 10)
      aside.css("bottom", 10)
      var s1 = getElementBottomToTop(mdBody)
      var s2 = getElementBottomToTop(asideInner)
      if (s2 > s1) {
        var bottom = getElementBottomToScreenBottom(mdBody)
        aside.css("bottom", bottom)
        aside.css("top", "auto")
      }
    } else {
      aside.css("top", contentToTop)
      aside.css("bottom", 10)
    }
  });
}

var bindClickLink = function() {
  var aside = $('.aside')
  var headerHeight = $('header').outerHeight()
  aside.find('a').click(function(event) {
    event.preventDefault()
    var id = $(this).attr('href')
    scrollToElement(id, headerHeight)
  })
}

var scrollToElement = function(id, headerHeight) {
  var element = $(id)
  var toTop = element.offset().top
  window.scrollTo(0, toTop - headerHeight)
}

var bindScrollTableActive = function() {
  var screenWidth = $(window).width()
  if (screenWidth <= 768) {
    return false
  }
  var aside = $('.aside')
  var headerHeight = $('header').outerHeight()
  $( window ).scroll(function() {
    aside.find('a').each(function() {
      var id = $(this).attr('href')
      var h = $(id)
      var elementToTop = getElementTopToScreenTop(h)
      if (elementToTop < headerHeight + 10) {
        aside.find('.active').removeClass('active')
        $(this).addClass('active')
      }
    })
  })
}

if ($('.aside').length > 0) {
  bindAsideScroll()
  bindScrollTableActive()
}
if ($('.common-layout .left-tree').length > 0) {
  bindLeftTreeScroll()
}
bindClickLink()
