import scikitplot as skplt
class GainLiftPlots():
    def __init__(self, probas, y_test):
        self.probas = probas
        self.y_test = y_test
    
    def gain_plot_report(self):
        gain_plot = skplt.metrics.plot_cumulative_gain(self.y_test, self.probas)
        lines = gain_plot.lines
        gain_plot_xy_data = []
        gain_plot_legends = []
        for i in range(len(lines)):
            gain_plot_xy_data.append(lines[i].get_xydata().tolist())
            gain_plot_legends.append(gain_plot.legend_.legendHandles[i]._label)
        return {
            "xydata":gain_plot_xy_data,
            "legends":gain_plot_legends
        }
    
    def lift_plot_report(self):
        lift_plot = skplt.metrics.plot_lift_curve(self.y_test, self.probas)
        lines = lift_plot.lines
        lift_plot_xy_data = []
        lift_plot_legends = []
        for i in range(len(lines)):
            lift_plot_xy_data.append(lines[i].get_xydata().tolist())
            lift_plot_legends.append(lift_plot.legend_.legendHandles[i]._label)
        return {
            "xydata":lift_plot_xy_data,
            "legends":lift_plot_legends
        }
