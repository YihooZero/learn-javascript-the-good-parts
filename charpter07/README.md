#### 正则表达式语法参考

| 元字符     | 描述                              |
| ---------- | --------------------------------- |
| `.`        | 除换行符以外的所有字符。          |
| `^`        | 字符串开头。                      |
| `$`        | 字符串结尾。                      |
| `\d,\w,\s` | 匹配数字、字符、空格。            |
| `\D,\W,\S` | 匹配非数字、非字符、非空格。      |
| `[abc]`    | 匹配 a、b 或 c 中的一个字母。     |
| `[a-z]`    | 匹配 a 到 z 中的一个字母。        |
| `[^abc]`   | 匹配除了 a、b 或 c 中的其他字母。 |
| `aa|bb`    | 匹配 aa 或 bb。                   |
| `?`        | 0 次或 1 次匹配。                 |
| `*`        | 匹配 0 次或多次。                 |
| `+`        | 匹配 1 次或多次。                 |
| `{n}`      | 匹配n次。                         |
| `{n,}`     | 匹配n次以上。                     |
| `{m,n}`    | 最少m次，最多n次匹配。            |

| <span style="display:inline-block;width:60px">修饰符</span> | 含义                               | 描述                                                         |
| :---------------------------------------------------------- | ---------------------------------- | :----------------------------------------------------------- |
| i                                                           | ignore - 不区分大小写              | 将匹配设置为不区分大小写，搜索时不区分大小写: A 和 a 没有区别。 |
| g                                                           | global - 全局匹配                  | 查找所有的匹配项。                                           |
| m                                                           | multi line - 多行匹配              | 使边界字符 `^` 和 `$` 匹配每一行的开头和结尾，记住是多行，而不是整个字符串的开头和结尾。 |
| s                                                           | 特殊字符圆点 `.` 中包含换行符 `\n` | 默认情况下的圆点 `.`  是匹配除换行符 `\n` 之外的任何字符，加上 `s` 修饰符之后,  `.` 中包含换行符 `\n`。 |

