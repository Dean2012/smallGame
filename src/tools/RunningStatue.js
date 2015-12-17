/**
 * 运行状态的枚举
 * 暂时增加 后期增加可往后增加
 *
 * Created by Dean on 2015/10/10
 */
var RunningStatue = RunningStatue || {};

RunningStatue.stop = 0; //停止 未运行
RunningStatue.running = 1; //运行
RunningStatue.waiting = 2; //等待
RunningStatue.sleep = 3; //休眠 等待运行
