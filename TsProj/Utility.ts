import { UnityEngine } from "csharp";
const { Vector3, Debug, Color } = UnityEngine;

import {Vec3} from './Vec3';


export class Utility {

    /**
     * @param points 控制点，点的个数代表贝塞尔曲线的阶数
     * @param t 0到1的时间值
     */
    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve
    // https://www.jasondavies.com/animated-bezier/
    public static getBezierLerpPoint(points: Vec3[], t: number): Vec3 {

        const n = points.length;

        const factors = [1];

        for (let i = 2; i < n + 1; i++) {

            let last = factors.slice(0);

            factors[0] = 1;

            factors[i - 1] = 1;

            for (let i = 0; i < last.length - 1; i++) {
                factors[i + 1] = last[i] + last[i + 1];
            }
        }

        let p:Vec3 = new Vec3();

        for (let i = 0; i < n; i++) {

            let value = factors[i] * Math.pow(1 - t, n - 1 - i) * Math.pow(t, i);
            p.add(points[i].clone().multiplyScalar(value));
        }

        return p;
    }

    /**
     * @param points 控制点，点的个数代表贝塞尔曲线的阶数
     * @param amount 曲线的点数量，数值越大，得到的曲线越平滑
     */
    public static getBezierPoints(points: Vec3[], amount: number): Vec3[] {

        const curve: Vec3[] = [];

        for (let i = 0; i < amount; i++) {

            curve.push(Utility.getBezierLerpPoint(points, i / (amount - 1)));
        }

        return curve;
    }

    public static update(transform: UnityEngine.Transform)
    {
        const array = [];
        for (let i = 0; i < transform.childCount; i++)
        {
            const child = transform.GetChild(i);

            array.push(new Vec3(child.position.x, child.position.y, child.position.z));
        }

        const result = Utility.getBezierPoints(array, 200);

        for (let i = 0; i < result.length - 1; i++)
        {
            const start = new Vector3(result[i].x, result[i].y, result[i].z);
            const end = new Vector3(result[i + 1].x, result[i + 1].y, result[i + 1].z);
            Debug.DrawLine(start, end, Color.red);
        }
    }
}