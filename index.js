const mixinMap = new Map()

module.exports = function mixin(target, Mixin, args) {
  Mixin.apply(target, args)
  if(!mixinMap.has(target))
    mixinMap.set(target, [])
  mixinMap.get(target).push(Mixin)
  target._mixin = isMixin
}

function isMixin(Mixin) {
  const mixins = mixinMap.get(this)
  return mixins && mixins.indexOf(Mixin) > -1
}