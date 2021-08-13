This repository contains unofficial patterns, sample code, or tools to help developers build more effectively with [Fauna][fauna]. All [Fauna Labs][fauna-labs] repositories are provided “as-is” and without support. By using this repository or its contents, you agree that this repository may never be officially supported and moved to the [Fauna organization][fauna-organization].

---

# UDF API

A proof of concept for pass-through UDF invocation via a REST API.

## Invocation

**NOTE**: Currently only works for databases in the Classic region group.

Make an HTTP POST request to the following URL:

https://udf-api.robsutter.workers.dev/

The body of the request should contain two fields:

* `function` - a string containing the name of the UDF to invoke
* `arguments` - an array containing the values to pass as arguments to your UDF

Set the header `X-Fauna-Secret` to the value of a key with permissions to invoke your UDF.

[fauna]: https://www.fauna.com/
[fauna-labs]: https://github.com/fauna-labs
[fauna-organization]: https://github.com/fauna
