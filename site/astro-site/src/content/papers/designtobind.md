---
title: "Design To Bind"
description: "A frightening discursion into the infernal realms of API design and system loading.."
pubDate: 2022-01-13
category: "research"
tags: ["binding", "loading", "API", "ABI", "strings"]
author: "Nick Porcino"
draft: false
---

# I. ABI

## The interface to your interface

### When is `foo` not a `foo`?

There is built in ambiguity at the ABI level:

  - C++
  - GCC SIMD returns
  - c fastcall

Loading your interfaces is obscure:

- `dlopen`
  - mystic nonsense? (**C++/Rust** name mangling)
  - type free for all? (**C/everything** ambiguous names)


What about structured interfaces?

  - grandpa had COM
  - handshaked interfaces not bad, actually

---
# II. Dynamic loading

## A frightening discursion into the infernal realms

### The Kings of Hell

The kings of hell are neutral. They provide an individually consistent set of rules and practices. Each king has a similar domain, superficially the same as the other kings, but each imposes sub-rules and conditions to ensure maddening contradiction and incompatibility with the schemes of the other kings. Naturally, all denizens of hell must satisfy all kings simultaneously. Without further ado let us meet the Kings.

---

### Ogdrannur, King of dynamic loading on Unix

**Ogdrannur** hereby proclaims that it is preferred that there is one true system, located at `/usr`, at which all common compatibilities and resources may be singularly found and utilized. The smallest change in the most peripheral of such dependencies must trigger an exhaustive reconciliation of all systems. 

Dependencies may be individually versioned, resulting in speciation of the dependency graph into infinite dependency graphs all co-existing in `/usr`. The graphs should not mix, but as a practical matter it is allowed, thus rendering the entire graph unresolvable, yet with a functional seeming.

Naturally this is untenable, so schemes exist to create virtual systems within the system. These virtual systems themselves have dependencies on the true system, yet over time may evolve the full complexity of the true system, including virtual systems within virtual systems; in an unbounded system of continuously evolving infinite expansion.

Resolution of dependencies follows rules hidden within the arcana of the **loader**, including, but not limited to, system path variables, loader path variables, rpaths hidden within ELF files, and settings of `$ORIGIN`.
As can be seen here, the results are difficult but not impossible to plumb:

```text
$ ldd /home/me/.local/lib/python2.7/site-packages/opentimelineio/cxx-sdk/lib64/libPyImath_Python2_7-3_0.so.26
linux-vdso.so.1 =>  (0x00007ffd62fda000)
libImath-3_0.so.26 => /home/me/.local/lib/python2.7/site-packages/foo/cxx-sdk/lib64/../lib64/libImath-3_0.so.26 (0x00007fa1b0a04000)
libpython2.7.so.1.0 => /lib64/libpython2.7.so.1.0 (0x00007fa1b0638000)
libboost_python-mt.so.1.53.0 => /lib64/libboost_python-mt.so.1.53.0 (0x00007fa1b03ed000)
libstdc++.so.6 => /lib64/libstdc++.so.6 (0x00007fa1b00e6000)
libm.so.6 => /lib64/libm.so.6 (0x00007fa1b0afde4000)
libgcc_s.so.1 => /lib64/libgcc_s.so.1 (0x00007fa1afbce000)
libc.so.6 => /lib64/libc.so.6 (0x00007fa1af800000)
libpthread.so.0 => /lib64/libpthread.so.0 (0x00007fa1af5e4000)
libdl.so.2 => /lib64/libdl.so.2 (0x00007fa1af3e000)
libutil.so.0 => /lib64/libutil.so.0 (0x00007fa1af1dd000)
librt.so.1 => /lib64/librt.so.1 (0x00007fa1aefd5000)
/lib64/ld-linux-x86-64.so.2 (0x00007fa1b2289000)
```
---

#### Eg'drarith, the King of Dynamic loading in Windows

**Eg'drarith** greets all, well met, fellow Regents.

There is *one* true system, located at `C:\system` and `C:\system32`. The system is small and its functionality limited. A side by side cache allows snapshots of prior systems to coexist with the true system, and dependencies may be computed against the true system, or the side by side cache. The two may be intentionally mixed through coercion, or unintentionally mixed through reference of a resource that does not exist in the side by side cache but does exist in the true system.

Environment variables are shared across the entire system, yet may be expected to be managed on a per-versioned system basis. Access and consistency of the environment is obtainable via supplication to dangerous entities within the System Hive. Any edits to the System Hive by the uninitiated may result in failure of the system in toto.

Resolution of dependencies is straight forward. Either the dependency exists as a sibling to a loaded entity, or it is in the system, or the dependency may be accessed at a location governed via the environmental `PATH` variable. This is guaranteed to work except for when it doesn't.

---

#### Sagmallon, King of Dynamic loading on macOS

**Sagmallon** counters, nay, gracious Kin, there is one true system, located within `/usr`. You may not modify it without voiding your warranty or otherwise violating your End User License Agreement. Dependencies may be introduced within the Hermetic enclave of an Application Bundle. Dependencies within the Application Bundle may be modified via an rpath system not unlike the linux rpath system, but not like it, entirely, either. If the rpath refers to anything outside of the Application Bundle via a relative path, the application becomes positionally fragile. The user interface makes it easy to relocate applications, thus breaking applications with outside-facing rpaths. Thus it is behaviorally reinforced that rpaths do not look outside of the Bundle. 

In order to meet the rules of Hell, a Unix like alternative realm exists, whose brewers and porters follow dependency resolution rules maddeningly similar, but not quite the same as Unix. Also pray heed, for I have introduced sandboxes and signing.

---

# III. The Princes of Hell

- Python
- Cmake
- boost
- glibc

---

# IV. The Dukes of Hell

- pip, virtualenv
- brew, conda
- docker, virtual machines
- and the like

---

# V. Data types

## Plain old data FTW

| Type | Rating | Interpretation |
| :--- | :--- | :--- |
| Cardinal types | ⭐️⭐️⭐️⭐️ | The world is your öyster |
| Recursive structs with cardinals | ⭐️⭐️⭐️ | Cruisin' down the highway |
| Types with initialization | ⭐️⭐️ | sigh, if we must |
| Compound types with initialization | ⭐️ | wait, is this a talk about language bindings, or some new special hell? |

## Strings

Strings are easy, yes? 
No.

I disallow `char*` as a memory managed string type in my interfaces, and also `std::string`. As peculiar as that sounds, the lifespan semantics around traditional C/C++ strings is complicated (sharing, static allocations, unwanted copies, deduplication).

My personal peculiarity is that I force the use of string slices, not the `std::string_view` which is another source of problems, but rather through API specific string interfaces that enforces the semantics of the library.

So, I might have an interface that requires you to intern a string, and pass around an immutable slice. Internally, I may store the strings in a *trie*. If we imagine a database of `SdfPaths`, in the USD world, every unique `SdfPath` can in practice be on the order of a kilobyte or more. Since `SdfPaths` are in principle mostly shared across other `SdfPaths`, parking all those strings in a *string-trie* means that shared prefixes are stored only once. The memory consumption is therefore closer to the size of the trie — the total amount of distinct prefix structure needed to represent the paths — rather than the sum of the lengths of every `SdfPath` counted independently.

I typically impose a string/slice PER library, since every library will have a unique twist ~ our strings are path-like ~ our strings are localizable ~ our strings are C style identifiers ~ et cetera.

Such interfaces turn out to be much less horrible than they sound. Because it's necessary to provide a slice to `c_str`, or slice to `std::string` adaptor for talking to other libraries, one doesn't really lose the ergonomics necessary to be `std::` idiomatic.

Example:

```C
typedef struct {
    const char* buff; // the buffer the user supplied
    size_t sz;        // the size used
    size_t req;       // the size required. If greater than sz, try again.
    int result;       // typically, OK == 0
} StringResult;

typedef struct {
    const char* buff; // the buffer the user supplied
    size_t sz;        // the size used
    size_t req;       // the size required. If greater than sz, zero terminated
    int result;       // typically, OK == 0
} SliceResult;

// pass zero for buffsize to measure the size of a required buffer.
// In this case the caller owns the memory.
StringResult WhatsMyName(Id namedThing, const char* buff, size_t buffsize);

// In this case the result is a static slice
SliceResult WhatsMyName(Id namedThing);
```

Note that in either case there is no ambiguity about ownership and lifespan.

---

# VI. Lifespan

## Data and objects

- wither malloc?
  - override an allocator
    - via linker tricks, common but scary
    - C++ intrisincs in std containers inline allocators and deallocators breaking overrides in dynamic linking scenarios
  - be explicit
    - allocator as a function
- ownership
  - cart before the horse?
    - python
  - intrusive?
  - borrowed/released?
  - ref counted?
  - good intentions?
  - managers?
- grouping
  - I have a hammer
    - Rust, C++, Python
  - what does the problem domain demand?
    - by lifespan
    - by dependency

---
## VII. Making your ABI

### IDL vs bindgen vs hand crafted

| Approach | Pipeline | Up-front effort | Maintenance |
| --- | --- | --- | --- |
| IDL | `idl -> generators -> target` | high | low |
| bindgen | `bindgen -> heuristic translation -> target` | low | high |
| handcrafted | `handcrafted -> what's best -> target` | high | high |

## VIII. Versioning and distribution

### Is this what I say it is?

- soversion
- namespacing
- side x side
- how is the library presented to the binder?
- how is the binder presented to the consumer?

## IX. Marshalling

### How do I get data into my interface?

- functionally?
  - api
- struct layouts?
  - like protobuf
- named response?
  - like json

## X. Reflection

### What can you tell me about yourself?

- these are the interfaces you can talk to me with
  - this is what you can give these interfaces
- these are the objects you can ask me about
  - these are the interfaces that work with that object
  - these are the properties of this object
    - these are the interfaces that work with that property
- these are some bytes you can copy

## XII. Reification

### I can put that in a data structure for you

- M? MV? MVC? MVVC? MC?
- also save and load
- see also reflection

## XIII. Fragility and safety

### Weak, or a rugpull?

- two sides of the same coin
- here's a docker environment
  - because no one can figure out how to build the build system
- I bundled everything
  - compiler, musl, every shim
- cargo vendor
- some dev in Nebraska (xkcd)
- abuse/misuse of the api
- test suites
- continuous integration
- coverage
- fuzzing

## XIV. Environment

### Are there drop bears in banyan trees?

#### Where will the library function?

- dashboard
- feature app
- native host in dcc
- cli piping
- web host
- cloud host

#### Scripting

- sure python
- lua
- dsl
- my own wacky thing
- more than one of the above AT THE SAME TIME

#### Wasm

- the high frontier
- the new docker
  - `node -wasi foo.wat`
- dependencies
  - can explode the payload

## XV. FINALLY! API

### The fun bit

- don't even think about it until you've hit everything else
- starting with the api and figuring out everything else after will cost 10x as much

---

## Appendix

Read about loaders here: [windows-vs-linux-loader-architecture](https://github.com/ElliotKillick/windows-vs-linux-loader-architecture)
