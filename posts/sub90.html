
# An Application of Neural Networks to the Guidance of Free-Swimming Submersibles

Domenico P. Porcino
James S. Collins

Engineering Department, Royal Roads Military College, FMO Victoria B.C. Canada

Paper published in International Joint Conference on Neural Networks, San Diego, 1990. pp. II:417-420

## Abstract

Most neural network models use "learning with a teacher" to train a great many simple processing elements. The Adaptive Search Element/Adaptive Critical Element model developed by Barto, Sutton, and Anderson, and elaborated on in this paper, is comprised of just two relatively complex units that use "learning with a critic". The ASE controls the physical system, and the ACE critizes the performance of the ASE in an effort to accelerate learning. In this paper, the basic model is extended to the realm of complex numbers, and the output is time averaged, yielding a system that has a continuously valued control output. The system learns quickly.

## Introduction

A.H. Klopft suggested in 1982 that neurons could learn via operant conditioning: they would lear to attain certain states while avoiding others. In the field of neuronal modelling therefore, the principles of behavioural psychology provide a way to train unsupersived systems.

The basis for the ASE and the ACE is the "Boxes" system of D. Michie, and R.A. Chambers (1968). State space is partitioned into "boxes", each with its own resident "demon" that nondeterministically chooses a control action appropriate to that state. All the demons together form a metaphor for the input synapses of a single neuron.

![Figure 1](http://nickporcino.com/posts/sub90/fig1.jpg "Figure 1")

The state space diagram of Figure 1 shows displacement versus velocity, partitioned into boxes. The shaded box shows velocity and displacement both large and positive. The demon within the box must choose an action that will be most likely to prevent a failure.

Learning - adaptation - is based on an estimate of how long the system would continue to operate after particular actions. When the system fails, the individual estimates in each box must be updated to make another similar failure less likely.

![Figure 2](http://nickporcino.com/posts/sub90/fig2.jpg "Figure 2")

Figure 2 shows the simulation's ASE/ACE controlling a submersible robot equipped with a thruster for forward motion, and up and down facing thrusters for maneuvering.

The only information available to the robot is the return from its sonar, which gives the distance to the ocean floor expressed as displacement from a desired distance above the bottom, and a failure signal which is supplied as a reinforcement signal whenever the robot exceeds the allowable vertical displacement. The robot doesn't know what criteria generates the failure signal, and must work through trial and error to avoid the punishing failure signal.

## Theory and Application - Adaptive Search Element

The state space decoder partitions the state vector and generates therefore a unique and finite set of combinations. The element whose quantization parameters best match the state vector gives an output of one, and every other element outputs a zero.

![Figure 3](http://nickporcino.com/posts/sub90/fig3.jpg "Figure 3")

As in Figure 1, Figure 3 shows a state with a large positive velocity and displacement.

Upon failure, ever element of the decoder is set to zero. This is an important condition for proper operation of the equations. The output of the decoder, x, is passed to the ASE, each element being oonnected to a particular synapse with a weight, w.

![Figure 4](http://nickporcino.com/posts/sub90/fig4.jpg "Figure 4")

This diagram illustrates how the synaptic weights might appear before much learning has taken place. Dark squares represent negative weights. Negative weights correspond to a high probability of thrusting upwards, positive, downwards.

The original model of Barto, Sutton, and Anderson used real synaptic weights to generate a binary output. In this version, complex weights consition of a real and imaginary part were used to allow a four valued output. A binary output allows thrust up and down; the extra values allow the thrusters to be shut off as well.

The following equation describes the output of the ASE at a given time:

![Equation 1](http://nickporcino.com/posts/sub90/eqn1.jpg "Equation 1")


The addition of a noise signal having a zero-center Guassian distribution causes the ASE's output to be governed by chance. The noise is necessary during early training to ensure that the system fully explores the state space. The noise should be gradually shut off over time to fine tune the weights, and completely shut off after training is complete to ensure consistent and repeatable behavior.

![Equation 2a](http://nickporcino.com/posts/sub90/eqn2a.jpg "Equation 2a")

![Equation 2b](http://nickporcino.com/posts/sub90/eqn2b.jpg "Equation 2b")

The output fo the ASE is passed through a thresholding function f. This quantizer provides the system's nonlinearity - utterly necessary for any computation. Equation (2a) describes the quantizer for real numbers, and (2b) shows the quantizer extended for complex numbers.

The controller's most recent choices were most likely responsible for the current success or failure of the system, and therefore the most eligible to have their weights changed. A complex eligibility trace e decays a rate governed by d valued between 0 and 1. The inclusion of the output of the ASE, y(t), means that eligibility will be positive decaying to zero if the ASE's output was positive and negative decaying towards zero otherwise.

![Equation 3](http://nickporcino.com/posts/sub90/eqn3.jpg "Equation 3")

The eligibility remembers how long ago a choice was made at a particular synapse, and what that chioice was.

![Equation 4](http://nickporcino.com/posts/sub90/eqn4.jpg "Equation 4")

This equation shows how weights change over time.

As shown in (4), the system learns through operant conditioning - setting the reinforcement signal r to -1 is an aversive stimulus, or punishment. A positive value for reinforcement is reward. The reinforcement signal as applied to the ASE in our complex-valued model is real, but internally it is treated as r + ri.

As long as the system is functioning properly, the reinforcement signal is held at zero, and the weights do not change. On the other hand, if a failure occurs, the negative value of the reinforcement will penalize the most receing decisions (highest eligibility synapses) which undoubtedly led to the failure, making those decisions less likely to occur in the future.

## Theory and Application - Adaptive Critical Element

When failure finally occurs, one particular sequence of decisions would probably have been better than the sequence that occurs. Based on that, the system learns. Unfortunately, this learning only occurs upon failure, which is to say hopefully infrequently. The ACE is added to provide a continuous feedback signal fed to the ASE as r hat. Reinforcement now arrives all the time - for good choices as well as for bad - so learning progresses at a much quicker rate.

The ACE receives the same decoder signal as the ASE, and also has a memory trace for every box as does the ASE. Rather than storing a best decision probability in each box, the ACE stores a prediction v(t) of the reinforcement the environment will provide for a particular state. Each synapse therofre contains a strong prediction of failure.

![Figure 5](http://nickporcino.com/posts/sub90/fig5.jpg "Figure 5")

Figure 5 shows what the ACE eventually learns about the submersible control problem. If displacement and velocity are both large and of the same sign, failure will soon occur. The white squares show where no reinforcement arrives from the environment, and the darker squares show that a failure signal is likely to occur soon.

![Equation 5](http://nickporcino.com/posts/sub90/eqn5.jpg "Equation 5")

This equation shows how the ACE makes its prediction, where v holds the ACE's internal weights, and x is the output of the decoder. At failure the ACE's prediction is zero as every decoder element output will be zero. The ACE sends the ASE the internal reinforcement signal:

![Equation 6](http://nickporcino.com/posts/sub90/eqn6.jpg "Equation 6")

Upoin failure, the output of the decoder and consequently the ACE, p(t), will be zero, but the external reinforcement, r, will be -1 (where usually it is zero). The internal reinforcement r hat will be the difference between the previous reinforcement signal p(t-1) and r. A fully predicted failure causes no reinforcement. Incorrect actions leading up the failure will be punished in accordance with how much the ACE's eligibility traces have decayed. The predictions of failure will be reinforced, because they were accurate.

In the absense of external signals, the discount term, gamma, causes the internal signals to gradually die away. The internal reinforcement, r hat, is the difference between the discounted prediction reinforcement and the previoulsy predicted reinforcement. Understanding the difference calculation of (6) is the key to understanding the whole operation:

If the system moves from a low danger to a high danger state, the internal reinforcement will be negative, punishing the system. If on the other hand the system moves from a high danger state to a low danger state, reinforcement will be positive: reward. From this information the system learns to avoid dangerous states. The equations govering learning in the ACE and ASE are very similar:

![Equation 7](http://nickporcino.com/posts/sub90/eqn7.jpg "Equation 7")

Notice that the term inside the square brackets is the same as the internal reinforcement signal r hat in (6). In form and substance (7) is almost the same as the ASE's weight change (4) except for the reinforcement term, and the form of the eligibility. The ACE's eligibility trace equation is similar to the ASE's in (3).

![Equation 8](http://nickporcino.com/posts/sub90/eqn8.jpg "Equation 8")

## Submersible Model and Simulation Results

Simple equations describe the simluation's kinectics. Friction was ignored, and the submersible given unit mass and neutral bouyancy. The horizontal component of the robot's velocity is held constant. State sapce is quantized into 64 boxes as experiment showed finer partitioning offered no particular advantage. Partitioning is exponential, giving finest control near the equilibrium point. If the system state moves into one of the extreme diplacement partitions, a crash or surfacing failure has occurred, and the trial is terminated.

The ASE/ACE parameters were set as in Barto et al 1982, as these are quire reasonable. Real parameters were changed to complex values having equal real and imaginary magnitudes. It is the interdependence of the two components of an imaginary number as it undergoes transformation that makes the solution robust and useful.

The vertical thrusters, goverened by the ASE's output, yield thrusts of -1, 0, or +1. The solution achieved by the system is quite interesting: The robot drifts back and forth within the safe corridor, thrusting only when necessary to stay within it.

![Figure 6](http://nickporcino.com/posts/sub90/fig6.jpg "Figure 6")

The solution was refined by adding continuous control of the output through time averaging over four or five steps. The weights generated are more difficult to undertand than those shown in Figure 6, as the solution is characterized by short, graduated thrusts which quickly retun the system to an almost zer vertical velocity. Unlike the previous solution which had clear cut boundaries surrounding the decision region, the time averge solution has a scattering of choices associated with each synapse. When averaged with neighbouring synapses, a graduated thrust results.

For use in practical situations, a successful solution should be frozen beforehand, and the ACE removed so that the behavior of the system is completely predictable in the field.

The ASE/ACE system learns quickly an generalizes rapidly to varying terrain. It was able take advantage of the time averaging of the output. Figure 7 shows a number of trial runs. Truncated lines indicate where failure occurred.

![Figure 7a](http://nickporcino.com/posts/sub90/fig7a.jpg "Figure 7a")

The earliest stages of training. The system makes many mistakes at first but soon learns to negotiation the terrain.

![Figure 7b](http://nickporcino.com/posts/sub90/fig7b.jpg "Figure 7b")

The next time interval with new terrain supplied. The system fails once, then successfully negotiates the terrain.

![Figure 7c](http://nickporcino.com/posts/sub90/fig7c.jpg "Figure 7c")

The terrain is changed again, and it is apparent that the system has generalized its solution and can function well over any terrain.

![Figure 7d](http://nickporcino.com/posts/sub90/fig7d.jpg "Figure 7d")

Later in the training, the system has no problem with arbitrary terrain. Performance is qualitatively similar over all terrains, the solution is robust.

## References

Barto A.G., R. S. Sutton, C.W. Anderson. Neuronlike adatpive elements that can solve difficult learning control problems. IEEE Transactions SMC, 1982. SMC-13: 834-846

Blackburn M.R., H.G. Nguyen. An Artificial Neural Network for Autonmous Undersea Vehicles. Naval Ocean Systems Center, San Diego, Ca. Technical Document 1318, July 1988

Knopf, A.H., The Hedonistic Neuron: A Theory of Memory, Learning, and Intelligence. Hemisphere Press, Washington D.C., 1982

Michie D., R.A. Chambers. BOXES: An experiment in adaptive control. Machine Intelligence 2, E. Dale and D. Mitchie, Eds. Oliver and Boyd, Edinburgh, pp. 137-152, 1968

<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>
