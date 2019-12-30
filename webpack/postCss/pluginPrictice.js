const postcss = require("postcss");
// lodash不是必要的，可以不用
const _ = require("lodash");

// postcss-viewport-to-px代表插件名
module.exports = postcss.plugin("postcss-viewport-to-px", () => {
  // 回调函数返回当前ast抽象语法数
  return css => {
    // 统计该语法树中一共需要多少media
    const medias = [];

    // 遍历rule层
    css.walkRules(rule => {
      // 相同rule层下的decl放到一起
      const decl1920 = [];
      const decl980 = [];

      // 只处理顶层root，包裹在类似media中的vw不处理
      if (rule.parent.type !== "root") {
        return;
      }

      // 遍历当前rule层中的decl规则
      rule.walkDecls(decl => {
        // 碰到vw/font-size/calc都不做处理
        // decl.value表示内容，代表width: 10px中的10px
        // decl.prop表示属性名，代表width: 10px中的width
        if (
          decl.value.indexOf("vw") === -1 ||
          decl.prop.indexOf("font-size") !== -1 ||
          decl.value.indexOf("calc") !== -1
        ) {
          return;
        }

        // 将vw转为px
        // 由于有可能是padding: 10vw 1vw 2vw 3vw这种形式，所以按照空格切分
        const vals = decl.value.split(/\s/);
        let str1920 = "";
        let str980 = "";
        // 遍历切换得出的数组，只处理vw单位的内容
        _.forEach(vals, (val, index) => {
          if (val.indexOf("vw") === -1) {
            str1920 += val;
            str980 += val;
          } else {
            let tmp = Number(val.replace("vw", ""));
            // 由于当前项目的设计稿宽度为1920px，所以100vw = 1920px
            str1920 += `${((tmp * 1920) / 100).toFixed(2)}px`;
            str980 += `${((980 / 100) * tmp).toFixed(2)}px`;
          }
          if (index !== vals.length - 1) {
            str1920 += " ";
            str980 += " ";
          }
        });

        // 保存相同rule层中的decl规则
        decl1920.push({
          value: str1920,
          prop: decl.prop
        });
        decl980.push({
          value: str980,
          prop: decl.prop
        });
      });

      // 排除没有匹配decl的rule层
      if (_.isEmpty[decl1920] || _.isEmpty(decl980)) {
        return;
      }

      // 将rule层放进meida，稍后统一处理
      medias.push(
        {
          parent: rule.parent, // 父层
          selector: rule.selector, // selector代表选择器，类似.demo {}
          decls: decl980,
          source: rule.source, // source表示来源代码，也就是你写的css代码
          media: "(max-width: 980px)"
        },
        {
          parent: rule.parent,
          selector: rule.selector,
          source: rule.source,
          media: "(min-width: 1920px)",
          decls: decl1920
        }
      );
    });

    _.forEach(medias, m => {
      // 生成media容器
      const atRule = postcss.atRule({
        name: "media",
        params: m.media,
        source: m.source
      });

      // 生成css空白代码片段
      const mediaRule = postcss.rule({
        selector: m.selector
      });

      // 为rule添加具体规则
      _.forEach(m.decls, decl => {
        mediaRule.append({
          prop: decl.prop,
          value: decl.value
        });
      });
      // 将相关规则放进media中
      atRule.append(mediaRule);

      // 添加到css语法树中
      m.parent.prepend(atRule);
    });
  };
});
