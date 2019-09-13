from twisted.trial import unittest
from tempfile import TemporaryDirectory, TemporaryFile
from synapseconfiggenerator.model import Model
from subprocess import check_output
from psutil import Process


class ConfigGeneratorTestCase(unittest.TestCase):
    def setUp(self):
        self.config_dir = TemporaryDirectory()
        self.model = Model(self.config_dir.name)

        print("\nUsing temp config dir {}".format(self.model.config_dir))

        # Set up fake certs
        self.tls_certificate_path = self.model.config_dir + "/cert.cert"
        self.tls_private_key_path = self.model.config_dir + "/key.key"
        open(self.tls_certificate_path, "w").write(CERT)
        open(self.tls_private_key_path, "w").write(KEY)

    def tearDown(self):
        try:
            # Kill the background synapse
            Process(
                int(open(self.config_dir.name + "/data/homeserver.pid").read())
            ).terminate()
        except:
            pass

        # Remove the tmp directory
        self.config_dir.cleanup()

    def test_synapse_starts_with_sql_database(self):
        self.model.write_config(
            {
                "server_name": "banterserver",
                "database": {"name": "sqlite3"},
                "listeners": [
                    {
                        "port": 8008,
                        "resources": [{"names": ["client", "federation"]}],
                        "tls": False,
                        "type": "http",
                    }
                ],
                "report_stats": True,
            }
        )

        check_output(["synctl", "start", self.model.config_dir])

    def test_synapse_starts_with_postgres_database(self):
        self.model.write_config(
            {
                "server_name": "banterserver",
                "database": {
                    "name": "psycopg2",
                    "args": {
                        "user": "matrix",
                        "password": "super safe whatever yadda yadda",
                        "host": "elton john",
                        "database": "matrix",
                        "cp_min": 15,
                        "cp_max": 25,
                    },
                },
                "listeners": [
                    {
                        "port": 8008,
                        "resources": [{"names": ["client", "federation"]}],
                        "tls": False,
                        "type": "http",
                    }
                ],
                "report_stats": True,
            }
        )

        check_output(["synctl", "start", self.model.config_dir])

    def test_synapse_starts_with_no_database(self):
        self.model.write_config(
            {
                "server_name": "banterserver",
                "listeners": [
                    {
                        "port": 8008,
                        "resources": [{"names": ["client", "federation"]}],
                        "tls": False,
                        "type": "http",
                    }
                ],
                "report_stats": True,
            }
        )

        check_output(["synctl", "start", self.model.config_dir])

    def test_synapse_starts_with_tls(self):
        self.model.write_config(
            {
                "server_name": "banterserver",
                "listeners": [
                    {
                        "port": 8008,
                        "resources": [{"names": ["client", "federation"]}],
                        "tls": True,
                        "type": "http",
                    }
                ],
                "report_stats": True,
                "tls_certificate_path": self.tls_certificate_path,
                "tls_private_key_path": self.tls_private_key_path,
            }
        )

        check_output(["synctl", "start", self.model.config_dir])


CERT = """-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIUA5B+dnoZkhyho5T0EbTElR5cqHcwDQYJKoZIhvcNAQEL
BQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM
GEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0xOTA5MTIxNDIxMDhaFw0yMDA5
MTExNDIxMDhaMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw
HwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwggIiMA0GCSqGSIb3DQEB
AQUAA4ICDwAwggIKAoICAQDIDwdhLf8LICCbzpXtpezzS+oxzQDq1VBMcpKM+Kev
Y1D2lXDfnti0Z+17kMFIdCyX3sFtb5ZKq9k7+VqZQMjirSUrD/LSOe+QHio+aIuT
piJSN6oYnjOTM1cSgUxoR4IV34Znvqsrnc/GHv4dIcGAWwMKJJ9QTGFxTwF02xOS
UnmrP314d9pLfS9mwP6PDBRi9NdFp+LH3cN6sI3N8VnotWzpaKp1BggCvBX+qf3W
nYe7hI4hccGXHC9Y0oYaAIGxv8g4P1Q8EsE9xBjVChxvVkLPs1a6bLgLMFJWlG7F
QoHWhRDoELOsPi9qp5jkKy9SXNp+/JvJr7TU7k/WxG0ksVL6wI1aH1LhaSSmAlQX
5oITmab5elsC+JN1792Gz5Bcz+0uZ8uM4UAYIz4ACpuYQ/rCUeH3/pDmOjHdmS7E
peha3rA5LwCTcqiD5uK+ik4aUTBpi6fhmAMLm2/+okhUYVIOO0x8WAEIUmBfw7I8
947u1mfTbPP8QDgV5XmN+Fs0E3YSMSVuCF1gDqxLzXqsJdBB16J+9GVyfwAdmiyq
Qi6jcT9iCRFOxZSPljCLG1Ee4oYQb0uSCzH4qm2kr6gswXqaocZ3UPlP37iu8kGX
8sk35i45k7aQRQK0+S5FyaRy2s6AVt4jdKGcgHWbF2Ri50kb5cVCxLtoeRM4/EWC
JQIDAQABo1MwUTAdBgNVHQ4EFgQUs8U/cf4dff9Gf7S28C3lNg35ee0wHwYDVR0j
BBgwFoAUs8U/cf4dff9Gf7S28C3lNg35ee0wDwYDVR0TAQH/BAUwAwEB/zANBgkq
hkiG9w0BAQsFAAOCAgEAuIB5tne8sYSFBMOIS1O4DDD5LJJ99r1Cm1SjFu16Jxrf
KUS02rkogGDOUzMWZWZ5nMGpixwXClO/VRbByXNqyh0WtEKxhLdPRdu/oyWXu+O0
K1mGPGcm19truIBlRPrQl5ABwybYq6fPaNdGeNYP24KIJz8vOHNvC2SAUsWxJgYl
fzL5tj7SI9x8jIxRFcn4CNfgQpAmP0DXWV0P1ejlxzizdnQRBjZe1F7X7uJ9FTLu
Z06Pu96rVoc4cl8z19kiNbg47q3K1sBKG3wOVsf9ejs7q6sGOZGxsYMIrljKtbBG
gxBeY513TjNM9IV1/Mr/HGDo2Uu7/0M1wbon3dfLoEeh2DAzuz5LDflAuH/rtqpk
VS8GK1Ix/ujpSp3hPaRWxGt4eKAYTxS4F/zadoAaBWVJIgmhgLm480KUyPUWLt9c
rJmlZlbNZOyYrmc+7SsOdluQLVC+XqSFr/ktkumYi+Oo/jTQExOQBzwo3s/TKUdk
qsVdsX5+LyFafmI0qSFYNz25xrUBKcngYN/9c4Ta3Qd665F6l828870r9uvrbl+2
XdlKNgjDic5obFwyEmrwpl9r/ChlhKn9nUPPMPecD/pt9QFtl2NT8wocSCt/dQ3c
KOfLDyeHNobvdQ+uTchRbGwRPQNj+jakpGptWjPNH6JSv4fKq98jZ6mdTwN7P1E=
-----END CERTIFICATE-----
"""

KEY = """-----BEGIN PRIVATE KEY-----
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
UAvRPMp/izS26HZ4wdhDN7B3tN2v5mK4
-----END PRIVATE KEY-----
"""
