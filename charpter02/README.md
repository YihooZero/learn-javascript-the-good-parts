### 条件判断假值

- false
- null
- undefined
- 空字符串""
- 数字0
- 数字NaN
>**NOTE:** 其他所有值都被当做真，包括但不限于true、Infinity、字符串"false"、字符串" "、字符串"0"、字符串"NaN"、对象{}、数组[]

### 运算符优先级

<table border="1" border-color="black">
    <tbody>
        <tr>
            <td align="left" valign="middle">. [ ] ( )</td>
            <td align="left" valign="middle">提取属性与调用函数</td>
        </tr>
        <tr>
            <td align="left" valign="middle">delete new typeof + - !</td>
            <td align="left" valign="middle">一元运算符</td>
        </tr>
        <tr>
            <td align="left" valign="middle">* / %</td>
            <td align="left" valign="middle">乘法、除法、求余</td>
        </tr>
        <tr>
            <td align="left" valign="middle">+ -</td>
            <td align="left" valign="middle">加法/连接、减法</td>
        </tr>
        <tr>
            <td align="left" valign="middle">>= <= > <</td>
            <td align="left" valign="middle">不等式运算符</td>
        </tr>
        <tr>
            <td align="left" valign="middle">=== !==</td>
            <td align="left" valign="middle">等式运算符</td>
        </tr>
        <tr>
            <td align="left" valign="middle">&&</td>
            <td align="left" valign="middle">逻辑与</td>
        </tr>
        <tr>
            <td align="left" valign="middle">||</td>
            <td align="left" valign="middle">逻辑或</td>
        </tr>
        <tr>
            <td align="left" valign="middle">?:</td>
            <td align="left" valign="middle">三元</td>
        </tr>
    </tbody>
</table>

>**NOTE:** 同一行的运算符并不表示它们的优先级一样，此表格只展示了大体的优先级顺序，详细优先级请参阅[MDN优先级运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

